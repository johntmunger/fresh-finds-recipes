<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Todo, FilterType } from "./types/todo";
import { Icon } from "@iconify/vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilters from "./components/TodoFilters.vue";
import * as api from "./services/api";

const todos = ref<Todo[]>([]);
const currentFilter = ref<FilterType>("all");
const isLoading = ref(false);
const error = ref<string | null>(null);

// Load todos from the server on mount
onMounted(async () => {
  await loadTodos();
});

const loadTodos = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    todos.value = await api.fetchTodos();
  } catch (err) {
    error.value = err instanceof api.ApiError ? err.message : "Failed to load todos";
    console.error("Error loading todos:", err);
  } finally {
    isLoading.value = false;
  }
};

const addTodo = async (text: string) => {
  error.value = null;
  try {
    const newTodo = await api.createTodo(text);
    todos.value.unshift(newTodo); // Add to the beginning for newest-first
  } catch (err) {
    error.value = err instanceof api.ApiError ? err.message : "Failed to add todo";
    console.error("Error adding todo:", err);
    throw err; // Re-throw so the input component can handle it
  }
};

const toggleTodo = async (id: number) => {
  const todo = todos.value.find((t) => t.id === id);
  if (!todo) return;

  // Optimistic update
  const previousCompleted = todo.completed;
  todo.completed = !todo.completed;

  error.value = null;
  try {
    await api.updateTodo(id, { completed: todo.completed });
  } catch (err) {
    // Revert on error
    todo.completed = previousCompleted;
    error.value = err instanceof api.ApiError ? err.message : "Failed to update todo";
    console.error("Error toggling todo:", err);
  }
};

const deleteTodo = async (id: number) => {
  // Optimistic update - store original in case we need to revert
  const todoIndex = todos.value.findIndex((t) => t.id === id);
  if (todoIndex === -1) return;

  const deletedTodo = todos.value[todoIndex];
  todos.value.splice(todoIndex, 1);

  error.value = null;
  try {
    await api.deleteTodo(id);
  } catch (err) {
    // Revert on error
    todos.value.splice(todoIndex, 0, deletedTodo);
    error.value = err instanceof api.ApiError ? err.message : "Failed to delete todo";
    console.error("Error deleting todo:", err);
  }
};

const filteredTodos = computed(() => {
  if (currentFilter.value === "completed") {
    return todos.value.filter((t) => t.completed);
  }
  return todos.value;
});

const activeCount = computed(() => todos.value.filter((t) => !t.completed).length);
const completedCount = computed(() => todos.value.filter((t) => t.completed).length);

const setFilter = (filter: FilterType) => {
  currentFilter.value = filter;
};

const dismissError = () => {
  error.value = null;
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden"
  >
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>
    </div>

    <div class="relative z-10 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header with animation -->
        <header class="text-center mb-6 sm:mb-10 animate-slide-in-down">
          <div class="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <Icon
              icon="mdi:checkbox-marked-circle"
              class="text-4xl sm:text-6xl text-blue-400 drop-shadow-lg animate-pulse"
            />
            <h1
              class="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient"
            >
              Todo App
            </h1>
          </div>
          <p
            class="text-gray-300 text-sm sm:text-base flex items-center justify-center gap-2 opacity-90"
          >
            <Icon icon="mdi:target" class="text-base sm:text-lg" />
            <span class="hidden sm:inline">Stay organized, get things done</span>
            <span class="sm:hidden">Stay organized</span>
          </p>
        </header>

        <!-- Error Message -->
        <div
          v-if="error"
          class="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl backdrop-blur-sm animate-slide-in-down"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:alert-circle" class="text-red-400 text-xl" />
              <span class="text-red-300 text-sm">{{ error }}</span>
            </div>
            <button
              class="text-red-400 hover:text-red-300 transition-colors"
              aria-label="Dismiss error"
              @click="dismissError"
            >
              <Icon icon="mdi:close" class="text-xl" />
            </button>
          </div>
        </div>

        <!-- Main card with glass morphism -->
        <div
          class="bg-gray-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden animate-scale-in"
        >
          <!-- Glow effect -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"
          ></div>

          <div class="relative p-4 sm:p-6 md:p-8">
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-12">
              <Icon icon="mdi:loading" class="text-6xl text-blue-400 animate-spin mx-auto mb-4" />
              <p class="text-gray-400">Loading todos...</p>
            </div>

            <!-- Content -->
            <template v-else>
              <TodoInput @add-todo="addTodo" />

              <TodoList :todos="filteredTodos" @toggle="toggleTodo" @delete="deleteTodo" />

              <TodoFilters
                v-if="todos.length > 0"
                :current-filter="currentFilter"
                :active-count="activeCount"
                :completed-count="completedCount"
                @filter-change="setFilter"
              />
            </template>
          </div>
        </div>

        <!-- Footer with animation -->
        <footer
          class="text-center mt-6 sm:mt-10 text-gray-400 text-xs sm:text-sm animate-slide-in-up opacity-80"
        >
          <p class="flex flex-wrap items-center justify-center gap-2">
            <Icon icon="mdi:vuejs" class="text-base sm:text-lg text-green-500" />
            <span class="hidden sm:inline">Built with Vue 3, TypeScript, and Tailwind CSS</span>
            <span class="sm:hidden">Vue 3 • TypeScript • Tailwind</span>
            <Icon icon="mdi:tailwind" class="text-base sm:text-lg text-cyan-400" />
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>
