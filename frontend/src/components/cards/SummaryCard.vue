<template>
  <div class="p-4 bg-white rounded-xl shadow-sm border flex flex-col gap-2">
    <p class="text-sm text-gray-500">{{ title }}</p>
    <h2 class="text-2xl font-semibold">{{ value }}</h2>

    <p v-if="subtext" class="text-xs text-gray-400">
      {{ subtext }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  subtext?: string;
}>();
</script>
