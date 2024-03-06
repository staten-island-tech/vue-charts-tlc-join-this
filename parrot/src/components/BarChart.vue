<template>
  <main>
    <h1>{{ this.getTianLength }}</h1>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </main>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
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
            label: "jump height in cm",
            borderWidth: 2,
            borderColor: "red",
            backgroundColor: "#ff0000aa",
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
      plugins: {
        title: {
          display: true,
          text: "jump height",
        },
      },
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
