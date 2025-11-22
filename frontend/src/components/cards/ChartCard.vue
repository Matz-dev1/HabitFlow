<template>
  <div class="p-4 bg-white rounded-xl shadow-sm border flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-700">
        {{ title }}
      </h3>
      <slot name="actions"></slot>
    </div>

    <div class="w-full h-64">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
