<template>
  <main>
    <Pie id="chart-id" :options="chartOptions" :data="chartData" />
  </main>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "Doughnut",
  components: { Pie },
  props: {
    data: Array,
    labels: Array,
  },
  data() {
    return {
      chartData: {
        labels: ["White", "Other", "Hispanic", "Black", "Asian / Pacific Islander", "Unknown"],
        datasets: [
          {
            data: this.data,
            label: "Babies",
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
      plugins: {},
    };
  },
};
</script>

<style scoped></style>
