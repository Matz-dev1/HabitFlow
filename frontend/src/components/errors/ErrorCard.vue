<template>
  <div
    class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-2"
  >
    <span>⚠️</span>
    <div>
      <h3 class="font-semibold">{{ title }}</h3>
      <p class="text-sm">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  message: string;
}>();
</script>
