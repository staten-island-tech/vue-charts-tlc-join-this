<template>
  <main>
    <Doughnut id="chart-id" :options="chartOptions" :data="chartData" />
  </main>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "Donut",
  components: { Doughnut },
  props: {
    data: Array,
    labels: Array,
  },
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            label: "Babies",
            hoverOffset: 4,
            backgroundColor: ["#1b1c6b", "#1e0f53", "#2539bd", "#5055b6", "#848bf2", "#a6b0fe"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>

<style scoped></style>
