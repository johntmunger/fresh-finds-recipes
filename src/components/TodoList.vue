<script setup lang="ts">
import type { Todo } from "../types/todo";
import { Icon } from "@iconify/vue";
import TodoItem from "./TodoItem.vue";

defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  toggle: [id: number];
  delete: [id: number];
}>();
</script>

<template>
  <div v-if="todos.length > 0" class="mb-6 sm:mb-8">
    <ul class="space-y-2 sm:space-y-3 max-h-[60vh] overflow-y-auto pr-1 sm:pr-2">
      <TodoItem
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="todo"
        :style="{ animationDelay: `${index * 50}ms` }"
        @toggle="emit('toggle', $event)"
        @delete="emit('delete', $event)"
      />
    </ul>
  </div>
  <div v-else class="text-center py-12 sm:py-16 text-gray-500 animate-scale-in">
    <div class="relative inline-block mb-4">
      <Icon
        icon="mdi:clipboard-text-outline"
        class="text-6xl sm:text-7xl mx-auto opacity-40 animate-pulse"
      />
      <div class="absolute inset-0 blur-xl bg-blue-500/10 animate-pulse"></div>
    </div>
    <p
      class="text-base sm:text-lg font-medium bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent"
    >
      No todos yet. Add one above!
    </p>
    <p class="text-xs sm:text-sm text-gray-600 mt-2">Start organizing your tasks</p>
  </div>
</template>
