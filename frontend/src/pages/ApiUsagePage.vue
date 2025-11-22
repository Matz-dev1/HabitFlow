<template>
  <MainLayout>
    <div class="p-6 space-y-6">
      <h1 class="text-3xl font-bold mb-4">API Usage</h1>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Requests" :value="totalRequests" />
        <StatCard title="Error Rate" :value="errorRate + '%'" />
        <StatCard title="Active Endpoints" :value="endpointsCount" />
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <Card>
          <h2 class="text-lg font-semibold mb-2">Requests Per Day</h2>
          <div class="h-64">
            <BarChart :labels="days" :values="requestsPerDay" />
          </div>
        </Card>

        <Card>
          <h2 class="text-lg font-semibold mb-2">Error Rate Trend</h2>
          <div class="h-64">
            <LineChart :labels="days" :values="errorsPerDay" />
          </div>
        </Card>

        <Card class="lg:col-span-2">
          <h2 class="text-lg font-semibold mb-2">Top Endpoints</h2>
          <div class="h-72">
            <PieChart
              :labels="topEndpointsLabels"
              :values="topEndpointsValues"
            />
          </div>
        </Card>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import Card from '../components/ui/Card.vue';
import StatCard from '../components/cards/StatCard.vue';

import LineChart from '../components/charts/LineChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import PieChart from '../components/charts/PieChart.vue';

// Mock Data
const days = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
const requestsPerDay = ref([3200, 2800, 3500, 3000, 4200, 2500, 3900]);
const errorsPerDay = ref([1.5, 2, 1.2, 1.8, 2.4, 1.1, 1.9]);

const topEndpointsLabels = ref(['/auth/login', '/users', '/billing', '/data']);
const topEndpointsValues = ref([21000, 15000, 9000, 8000]);

// Summary Info
const totalRequests = ref(requestsPerDay.value.reduce((a, b) => a + b, 0));
const errorRate = ref(2.1);
const endpointsCount = ref(topEndpointsLabels.value.length);
</script>
