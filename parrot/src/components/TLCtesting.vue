<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
const data = "https://data.cityofnewyork.us/resource/wffy-3iyg.json";
async function getData() {
  const data = fetch("https://data.cityofnewyork.us/resource/wffy-3iyg.json");
  const get = (await data).json;
}
const list = [1, 2, 3, 4, 5];
const cat = true;
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped></style>
