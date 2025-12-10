<script setup lang="ts">
import type { Todo } from "../types/todo";
import { Icon } from "@iconify/vue";

defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  toggle: [id: number];
  delete: [id: number];
}>();
</script>

<template>
  <li
    class="group flex items-center gap-3 sm:gap-4 p-3 sm:p-5 bg-gradient-to-r from-gray-700/40 to-gray-700/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:from-gray-700/60 hover:to-gray-700/80 transition-all duration-300 border border-gray-600/30 hover:border-gray-500/50 animate-slide-in-up hover:scale-[1.02] active:scale-[0.98]"
  >
    <!-- Custom Checkbox Button -->
    <button
      class="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 relative overflow-hidden"
      :class="[
        todo.completed
          ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 shadow-lg shadow-green-500/50 scale-110'
          : 'border-gray-500 hover:border-blue-400 hover:bg-blue-500/10 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30',
      ]"
      aria-label="Toggle todo"
      @click="emit('toggle', todo.id)"
    >
      <Icon
        v-if="todo.completed"
        icon="mdi:check-bold"
        class="text-white text-base sm:text-lg transition-all duration-300 animate-scale-in"
      />
      <div
        v-else
        class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 rounded-full transition-all duration-300"
      ></div>
    </button>

    <!-- Todo Text -->
    <span
      :class="[
        'flex-1 text-sm sm:text-base transition-all duration-300 break-words',
        todo.completed
          ? 'line-through text-gray-500 opacity-60'
          : 'text-gray-100 group-hover:text-white',
      ]"
    >
      {{ todo.text }}
    </span>

    <!-- Delete Button -->
    <button
      class="flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-red-400 hover:text-white bg-red-500/0 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold flex items-center gap-1 sm:gap-1.5 border border-red-500/30 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100"
      aria-label="Delete todo"
      @click="emit('delete', todo.id)"
    >
      <Icon icon="mdi:delete" class="text-base sm:text-lg" />
      <span class="hidden sm:inline">Delete</span>
    </button>
  </li>
</template>
