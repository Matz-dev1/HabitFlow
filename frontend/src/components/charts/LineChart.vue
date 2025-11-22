<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

// Add a colored line
const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: 'Signups',
      data: props.values,
      borderColor: '#4F46E5', // Indigo
      backgroundColor: 'rgba(79, 70, 229, 0.2)', // transparent fill
      tension: 0.3,
      fill: true,
      pointBackgroundColor: '#4F46E5',
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
