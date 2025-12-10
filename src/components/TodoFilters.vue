<script setup lang="ts">
import type { FilterType } from "../types/todo";
import { Icon } from "@iconify/vue";

defineProps<{
  currentFilter: FilterType;
  activeCount: number;
  completedCount: number;
}>();

const emit = defineEmits<{
  filterChange: [filter: FilterType];
}>();
</script>

<template>
  <div class="pt-4 sm:pt-6 border-t border-gray-700/50">
    <!-- Stats Row -->
    <div class="flex items-center justify-between mb-4 sm:mb-5 px-2 text-xs sm:text-sm">
      <div class="flex items-center gap-2 group">
        <div class="relative">
          <Icon
            icon="mdi:clock-outline"
            class="text-base sm:text-lg text-blue-400 group-hover:scale-110 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 blur-md bg-blue-400/20 group-hover:bg-blue-400/40 transition-all duration-300"
          ></div>
        </div>
        <span
          class="font-semibold text-gray-300 group-hover:text-white transition-colors duration-300"
        >
          <span class="text-blue-400 text-base sm:text-lg">{{ activeCount }}</span>
          <span class="hidden sm:inline ml-1">{{ activeCount === 1 ? "item" : "items" }} left</span>
          <span class="sm:hidden ml-1">left</span>
        </span>
      </div>

      <div class="flex items-center gap-2 group">
        <span
          class="font-semibold text-gray-300 group-hover:text-white transition-colors duration-300"
        >
          <span class="text-green-400 text-base sm:text-lg">{{ completedCount }}</span>
          <span class="hidden sm:inline ml-1">completed</span>
          <span class="sm:hidden ml-1">done</span>
        </span>
        <div class="relative">
          <Icon
            icon="mdi:check-all"
            class="text-base sm:text-lg text-green-400 group-hover:scale-110 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 blur-md bg-green-400/20 group-hover:bg-green-400/40 transition-all duration-300"
          ></div>
        </div>
      </div>
    </div>

    <!-- Filter Buttons -->
    <div class="flex gap-2 sm:gap-4 justify-center">
      <button
        :class="[
          'flex-1 sm:flex-initial px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm border',
          currentFilter === 'all'
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/50 scale-105'
            : 'text-gray-300 bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white hover:scale-105 hover:shadow-lg',
        ]"
        @click="emit('filterChange', 'all')"
      >
        <Icon icon="mdi:view-list" class="text-base sm:text-xl" />
        <span>All Todos</span>
      </button>
      <button
        :class="[
          'flex-1 sm:flex-initial px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm border',
          currentFilter === 'completed'
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/50 scale-105'
            : 'text-gray-300 bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white hover:scale-105 hover:shadow-lg',
        ]"
        @click="emit('filterChange', 'completed')"
      >
        <Icon icon="mdi:check-circle" class="text-base sm:text-xl" />
        <span>Completed</span>
      </button>
    </div>
  </div>
</template>
