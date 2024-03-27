<template>
  <main>
    <Pie id="pie-chart" :options="chartOptions" :data="chartData" aria-label="the chart" />
  </main>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export default {
  name: "PieChart",
  components: { Pie },
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
            label: "babies by name",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        events: ["mousemove", "mouseout", "touchmove"],
      },
      plugins: {
        colors: { enabled: true, forceOverride: true },
      },
    };
  },
  computed: {
    // comedy
    getTianLength() {
      return `tian lang says the length is ${this.data.length}0`;
    },
  },
};
</script>

<style scoped></style>
