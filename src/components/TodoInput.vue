<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const emit = defineEmits<{
  addTodo: [text: string];
}>();

const newTodo = ref("");

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    emit("addTodo", newTodo.value.trim());
    newTodo.value = "";
  }
};
</script>

<template>
  <form class="mb-6 sm:mb-8" @submit.prevent="handleSubmit">
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex-1 relative group">
        <input
          v-model="newTodo"
          type="text"
          placeholder="What needs to be done?"
          class="w-full px-4 sm:px-5 py-3 sm:py-4 text-gray-100 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-gray-700/70 transition-all duration-300 placeholder-gray-500 text-sm sm:text-base shadow-lg hover:shadow-blue-500/10 hover:border-gray-500"
        />
        <div
          class="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-blue-500/10 pointer-events-none transition-all duration-500"
        ></div>
      </div>
      <button
        type="submit"
        class="px-5 sm:px-8 py-3 sm:py-4 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 text-sm sm:text-base group"
      >
        <Icon
          icon="mdi:plus-circle"
          class="text-xl sm:text-2xl transition-transform duration-300 group-hover:rotate-90"
        />
        <span class="hidden sm:inline">Add Todo</span>
        <span class="sm:hidden">Add</span>
      </button>
    </div>
  </form>
</template>
