<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["lawrence", "tian lang chen", "jay"],
        datasets: [
          {
            data: [1, 20, 2],
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
};
</script>

<style scoped></style>
