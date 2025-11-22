<template>
  <div class="p-4 bg-white rounded-xl shadow-sm border flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <span class="text-gray-500 text-sm">{{ title }}</span>
      <slot name="icon"></slot>
    </div>

    <div class="flex items-end justify-between">
      <h2 class="text-3xl font-semibold">{{ value }}</h2>

      <div
        v-if="trend !== undefined"
        class="flex items-center text-sm"
        :class="
          trend > 0
            ? 'text-green-600'
            : trend < 0
            ? 'text-red-600'
            : 'text-gray-500'
        "
      >
        <span>{{ trend > 0 ? '+' : '' }}{{ trend }}%</span>
        <span class="ml-1">
          <svg
            v-if="trend > 0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15l7.5-7.5L19.5 15"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 9l-7.5 7.5L4.5 9"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  trend?: number; // positive or negative %
}>();
</script>
