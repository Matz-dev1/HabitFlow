<template>
  <div class="w-full max-w-sm mx-auto">
    <div
      v-if="success"
      class="flex flex-col items-center gap-4 p-6 bg-green-50 border border-green-200 rounded-lg"
    >
      <h2 class="text-xl font-semibold text-green-800">
        Account Created Successfully!
      </h2>
      <p class="text-sm text-green-700 text-center">
        Your account has been created. You can now log in to your account.
      </p>
      <div class="flex gap-3 mt-2">
        <RouterLink
          to="/login-form"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Go to Login
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Go to Dashboard
        </RouterLink>
      </div>
    </div>

    <!-- Formularz rejestracji -->
    <form v-else @submit="handleSubmit" class="flex flex-col gap-4" novalidate>
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
        :disabled="loading"
      >
        {{ loading ? 'Creating account…' : 'Create Account' }}
      </button>

      <p v-if="error || authStore.error" class="text-sm text-red-500">
        {{ error || authStore.error }}
      </p>

      <div class="mt-4 text-center text-sm">
        Already have an account?
        <RouterLink
          href="#"
          class="underline underline-offset-4"
          to="/login-form"
        >
          Login
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../../store';
import { validateEmail } from '../../utils/validation';
import { getPasswordErrors } from '../../utils/validation';

const email = ref('');
const password = ref('');
const confirm = ref('');
const error = ref<string | null>(null);
const success = ref(false);

const authStore = useAuthStore();
const loading = computed(() => authStore.loading);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  error.value = null;
  success.value = false;
  authStore.clearError();

  // Walidacja emaila
  const emailError = validateEmail(email.value);
  if (emailError) {
    error.value = emailError;
    return;
  }

  // Walidacja hasła
  const passwordErrors = getPasswordErrors(password.value);
  if (passwordErrors.length > 0) {
    error.value = passwordErrors[0]; // show first invalid rule
    return;
  }

  if (password.value !== confirm.value) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    await authStore.register({
      email: email.value.trim(),
      password: password.value,
      confirmPassword: confirm.value,
    });

    // Po udanej rejestracji - pokaż komunikat sukcesu
    success.value = true;
    // Opcjonalnie: wyczyść formularz
    email.value = '';
    password.value = '';
    confirm.value = '';
  } catch (err: any) {
    error.value = err.message || 'Registration failed';
  }
};
</script>
