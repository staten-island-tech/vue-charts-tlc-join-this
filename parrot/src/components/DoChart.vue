import { Doughnut } from 'vue-chartjs';
<template>
  <Doughnut id="Doughnut" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: Doughnut,
  components: {
    Doughnut,
  },
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
        respnosive: true,
      },
      plugins: {},
    };
  },
};
</script>
