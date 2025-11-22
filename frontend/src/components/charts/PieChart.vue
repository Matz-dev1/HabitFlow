<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

// Predefined color palette
const colors = ['#4F46E5', '#F59E0B', '#10B981', '#EF4444', '#3B82F6'];

const chartData = {
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: props.values.map((_, i) => colors[i % colors.length]),
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
