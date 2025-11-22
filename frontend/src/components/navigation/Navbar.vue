<template>
  <nav class="flex items-center justify-between h-16 px-6 bg-white border-b">
    <h1 class="text-xl font-semibold">My Dashboard</h1>

    <div class="flex items-center gap-4">
      <button @click="sidebarStore.toggle">☰</button>
      <RouterLink to="/"
        ><img :src="Logo" class="w-8 h-8 rounded-full"
      /></RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Logo from '../../assets/icons/logo.svg';
import { useSidebarStore } from '../../store';
import { RouterLink } from 'vue-router';

const sidebarStore = useSidebarStore();
</script>
