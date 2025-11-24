<template>
  <form
    @submit="handleSubmit"
    class="flex flex-col gap-4 w-full max-w-sm mx-auto"
  >
    <div>
      <div class="font-bold">Login to your account</div>
      <p class="text-sm text-gray-500">Enter your email and password below</p>
    </div>
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
    <RouterLink
      href="#"
      class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
      to="/password-reset"
    >
      Forgot your password?
    </RouterLink>

    <button
      type="submit"
      class="bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
      :disabled="loading"
    >
      {{ loading ? 'Logging in…' : 'Login' }}
    </button>

    <p v-if="error || authStore.error" class="text-sm text-red-500">
      {{ error || authStore.error }}
    </p>
    <div class="mt-4 text-center text-sm">
      Don't have an account?
      <RouterLink
        href="#"
        class="underline underline-offset-4"
        to="/register-form"
      >
        Sign up
      </RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../../store';
import { validateEmail } from '../../utils/validation';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

const authStore = useAuthStore();
const loading = computed(() => authStore.loading);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  error.value = null;
  authStore.clearError();

  // Walidacja emaila
  const emailError = validateEmail(email.value);
  if (emailError) {
    error.value = emailError;
    return;
  }

  if (!password.value || password.value.trim() === '') {
    error.value = 'Password is required';
    return;
  }

  try {
    await authStore.login({
      email: email.value.trim(),
      password: password.value,
    });
  } catch (err: any) {
    error.value = err.message || 'Login failed';
  }
};
</script>
