<template>
  <div class="p-4 bg-white shadow rounded-lg">
    <template v-if="title !== undefined && value !== undefined">
      <p class="text-gray-500">{{ title }}</p>
      <h2 class="text-xl font-semibold">{{ value }}</h2>
    </template>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
const { title, value } = defineProps<{
  title?: string;
  value?: string | number;
}>();
</script>
