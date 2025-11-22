<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-4 w-full max-w-sm mx-auto"
  >
    <div>
      <label class="text-sm text-gray-600">Email</label>
      <input
        v-model="email"
        type="email"
        class="w-full p-2 rounded border"
        required
      />
    </div>

    <div>
      <label class="text-sm text-gray-600">Password</label>
      <input
        v-model="password"
        type="password"
        class="w-full p-2 rounded border"
        required
      />
    </div>

    <div>
      <label class="text-sm text-gray-600">Confirm Password</label>
      <input
        v-model="confirm"
        type="password"
        class="w-full p-2 rounded border"
        required
      />
    </div>

    <button
      type="submit"
      class="bg-green-600 text-white p-2 rounded hover:bg-green-500"
    >
      Create Account
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const confirm = ref('');
</script>
