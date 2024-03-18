<!-- <script setup>
import BarChart from "../components/BarChart.vue";
import TLCtesting from "@/components/TLCtesting.vue";
import BabyYear from "@/views/BabyYear.vue";

const object1 = {
  labels: ["January", "February", "March"],
  datasets: [{ data: [40, 20, 45] }],
};

const object2 = {
  responsive: true,
};
</script>

<template>
  <main>
    <BabyYear />
  </main>
</template>
 -->

<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
let list2 = [];
const valueList = new Set();
let data = null;
let birthYear = [];
let babiesBorn = [];
async function getData() {
  const response = await fetch("https://data.cityofnewyork.us/resource/wffy-3iyg.json");
  data = await response.json();
  console.log(data);
  data.forEach((call) => list2.push(call.birth_year));
}

import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null,
  }),
  async mounted() {
    this.loaded = false;

    try {
      await getData();
      this.chartData = {
        labels: birthYear,
        datasets: [
          {
            label: "Babies Born over the years.",
            data: babiesBorn,
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 3,
          },
        ],
      };

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }

    function getOccurrence(array, value) {
      console.log(value, array.filter((v) => v === value).length);
      birthYear.push(value);
      babiesBorn.push(array.filter((v) => v === value).length);
    }

    function createSet(array, set) {
      set.add(array.birth_year);
    }

    function filterByYear(list, value) {
      let filterlist = null;
      let babies = 0;
      filterlist = list.filter((filtering) => filtering.birth_year === value);
      filterlist.forEach((push) => (babies += parseInt(push.births)));
      console.log(filterlist);
      birthYear.push(value);
      babiesBorn.push(babies);
    }

    data.forEach((sort) => createSet(sort, valueList));
    console.log(valueList);

    console.log(birthYear, babiesBorn);

    valueList.forEach((add) => filterByYear(data, add));
  },
};
</script>

<style scoped></style>
