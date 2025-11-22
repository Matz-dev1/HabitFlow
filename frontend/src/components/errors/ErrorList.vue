<template>
  <div class="flex flex-col gap-3">
    <ErrorCard
      v-for="(err, i) in errors"
      :key="i"
      :title="err.title"
      :message="err.message"
    />
  </div>
</template>

<script setup lang="ts">
import ErrorCard from './ErrorCard.vue';

defineProps<{
  errors: { title: string; message: string }[];
}>();
</script>
