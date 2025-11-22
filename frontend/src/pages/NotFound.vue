<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center text-center bg-gray-950 text-gray-200 px-6"
  >
    <h1 class="text-6xl font-bold text-red-500 mb-4">404</h1>
    <h2 class="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p class="mb-6 text-gray-400">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <RouterLink
      to="/"
      class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
    >
      Go to Dashboard
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  router.replace('/not-found');
});
</script>
