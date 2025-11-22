<template>
  <div class="flex h-screen">
    <Sidebar v-if="sidebarStore.isOpen" />

    <div class="flex-1 flex flex-col">
      <Navbar />

      <main class="p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/navigation/Navbar.vue';
import Sidebar from '../components/navigation/Sidebar.vue';
import { useSidebarStore } from '../store';

const sidebarStore = useSidebarStore();
</script>
