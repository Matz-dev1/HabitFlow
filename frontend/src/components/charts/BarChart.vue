<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const { labels, values } = defineProps<{
  labels: string[];
  values: number[];
}>();

// Each bar can have a different color
const colors = [
  '#4F46E5',
  '#F59E0B',
  '#10B981',
  '#EF4444',
  '#3B82F6',
  '#8B5CF6',
  '#EC4899',
];

const chartData = {
  labels,
  datasets: [
    {
      label: 'API Requests',
      data: values,
      backgroundColor: values.map((_, i) => colors[i % colors.length]),
      borderRadius: 4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
