<template>
  <main>
    <h1>{{ this.getTianLength }}</h1>
    <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
  </main>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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
        maintainAspectRatio: false,
      },
      plugins: {},
    };
  },
  computed: {
    getTianLength() {
      return `tian lang says the length is ${this.data.length}0`;
    },
  },
};
</script>

<style scoped></style>
