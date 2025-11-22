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

    <button
      type="submit"
      class="bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
      :disabled="loading"
    >
      {{ loading ? 'Logging in…' : 'Login' }}
    </button>

    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const loading = ref(false);

const auth = useAuthStore();

const handleSubmit = async () => {
  error.value = null;
  loading.value = true;

  try {
    await auth.login(email.value, password.value);
  } catch (err: any) {
    error.value = err.message || 'Login failed';
  } finally {
    loading.value = false;
  }
};
</script>
