<template>
  <aside
    class="w-60 bg-gray-100 h-screen p-4 border-r flex justify-between flex-col"
  >
    <nav class="flex flex-col gap-4">
      <RouterLink to="/dashboard"> Dashboard</RouterLink>
      <RouterLink to="/api-usage"> Api Usage</RouterLink>
      <RouterLink to="/users"> Users</RouterLink>
      <RouterLink to="/settings"> Settings</RouterLink>
    </nav>
    <div class="flex w-full justify-center gap-6">
      <RouterLink to="/login-form">Login</RouterLink>
      <RouterLink to="register-form">Register</RouterLink>
    </div>
  </aside>
</template>
