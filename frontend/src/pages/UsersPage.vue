<template>
  <MainLayout>
    <div class="p-6 space-y-6">
      <h1 class="text-3xl font-bold mb-4">Users</h1>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Users" :value="totalUsers" />
        <StatCard title="New This Week" :value="newUsers" />
        <StatCard title="Active %" :value="activePercent + '%'" />
      </div>

      <!-- Charts -->
      <ChartCard title="User Growth">
        <LineChart :labels="months" :values="growth" />
      </ChartCard>

      <!-- Users Table -->
      <Card>
        <h2 class="text-lg font-semibold mb-4">User List</h2>

        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th class="p-3">Name</th>
              <th class="p-3">Email</th>
              <th class="p-3">Status</th>
              <th class="p-3">Role</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in users"
              :key="user.email"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="p-3">{{ user.name }}</td>
              <td class="p-3 text-gray-600">{{ user.email }}</td>
              <td class="p-3">
                <span
                  class="px-2 py-1 rounded text-white text-xs"
                  :class="user.active ? 'bg-green-500' : 'bg-red-500'"
                >
                  {{ user.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="p-3">{{ user.role }}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import Card from '../components/ui/Card.vue';
import StatCard from '../components/cards/StatCard.vue';
import ChartCard from '../components/cards/ChartCard.vue';

import LineChart from '../components/charts/LineChart.vue';

// Summary Data
const totalUsers = ref(9280);
const newUsers = ref(120);
const activePercent = ref(84);

// Growth Chart Data
const months = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']);
const growth = ref([7000, 7300, 7500, 7900, 8500, 9280]);

// Mock Users
const users = ref([
  { name: 'Mark Johnson', email: 'mark@site.com', active: true, role: 'Admin' },
  { name: 'Sarah Lee', email: 'sarah@site.com', active: true, role: 'User' },
  { name: 'David Kim', email: 'david@site.com', active: false, role: 'User' },
  {
    name: 'Emily Carter',
    email: 'emily@site.com',
    active: true,
    role: 'Moderator',
  },
]);
</script>
