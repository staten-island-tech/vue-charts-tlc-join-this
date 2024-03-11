<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
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

function getOccurrence(array, value) {
  console.log(value, array.filter((v) => v === value).length);
  birthYear.push(value);
  babiesBorn.push(array.filter((v) => v === value).length);
}

function createSet(array, set) {
  set.add(array.birth_year);
}

function data2() {
  valueList.forEach((sort) => getOccurrence(list2, sort));
}
await getData();

data.forEach((sort) => createSet(sort, valueList));
console.log(valueList);
data2();
console.log(birthYear, babiesBorn);
// const list = [1, 2, 3, 4, 5];
// const cat = true;
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      height: 1000,
      chartData: {
        labels: birthYear,
        datasets: [
          {
            label: "Data Set",
            data: babiesBorn,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
// export default {
//   name: "BarChart",
//   components: { Bar },
//   props: {
//     chartData: {
//       type: Object,
//       required: true,
//     },
//     chartOptions: {
//       type: Object,
//       default: () => {},
//     },
//   },
// };
</script>

<style scoped></style>
