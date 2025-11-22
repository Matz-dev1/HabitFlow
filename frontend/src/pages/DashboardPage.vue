<template>
  <MainLayout>
    <div class="p-6 flex flex-col gap-6">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Users"
          :value="stats.totalUsers"
          subtext="All registered accounts"
        />

        <SummaryCard
          title="API Calls Today"
          :value="stats.apiToday"
          subtext="Requests in last 24h"
        />

        <SummaryCard
          title="Error Rate"
          :value="stats.errorRate + '%'"
          subtext="Last 24h errors"
        />
      </div>

      <!-- Trend Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Weekly User Growth"
          :value="weeklyUserGrowth.value"
          :trend="weeklyUserGrowth.trend"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3v18h18M8 14l3-3 5 5 4-4"
              />
            </svg>
          </template>
        </StatCard>

        <StatCard
          title="API Usage Trend"
          :value="apiTrend.value"
          :trend="apiTrend.trend"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3v18h18M8 10l3 3 5-5 4 4"
              />
            </svg>
          </template>
        </StatCard>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="User Signups (Last 7 Days)">
          <LineChart :labels="chartData.days" :values="chartData.signups" />
        </ChartCard>

        <ChartCard title="API Requests (Last Week)">
          <BarChart :labels="chartData.days" :values="chartData.apiRequests" />
        </ChartCard>

        <ChartCard title="Error Distribution">
          <PieChart
            :labels="chartData.errorTypes"
            :values="chartData.errorCounts"
          />
        </ChartCard>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import MainLayout from '@/layouts/MainLayout.vue';
import { Stats, TrendStat, ChartData } from '../types/dashboard.ts';
// Cards + charts
import SummaryCard from '@/components/cards/SummaryCard.vue';
import StatCard from '@/components/cards/StatCard.vue';
import ChartCard from '@/components/cards/ChartCard.vue';

import LineChart from '@/components/charts/LineChart.vue';
import BarChart from '@/components/charts/BarChart.vue';
import PieChart from '@/components/charts/PieChart.vue';

// ------------------- Mock Data using ref() ---------------------

const stats = ref<Stats>({
  totalUsers: 1240,
  apiToday: 8420,
  errorRate: 2.1,
});

const weeklyUserGrowth = ref<TrendStat>({
  value: '320 new',
  trend: 12,
});

const apiTrend = ref<TrendStat>({
  value: '34k calls',
  trend: 7,
});

const chartData = ref<ChartData>({
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  signups: [12, 25, 18, 30, 22, 35, 40],
  apiRequests: [1000, 1500, 900, 2000, 1800, 2400, 3100],
  errorTypes: ['404', '500', '401', 'Timeout'],
  errorCounts: [120, 50, 30, 10],
});
</script>
