<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
let list2 = [];
const valueList = new Set();
let data = null;
let babyObjet = [];
async function getData() {
  const response = await fetch("https://data.cityofnewyork.us/resource/wffy-3iyg.json");
  data = await response.json();
  console.log(data);
  data.forEach((call) => list2.push(call.birth_year));
}

function getOccurrence(array, value) {
  valueList.add(value);

  console.log(value, array.filter((v) => v === value).length);
  console.log(valueList);
  // babyObjet.push({ year: value, babies: array.filter((v) => v === value).length });
  // console.log(babyObjet);
}

function data2() {
  data.forEach((sort) => getOccurrence(list2, sort.birth_year));
}
await getData();
data2();
const list = [1, 2, 3, 4, 5];
const cat = true;
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>

<style scoped></style>
