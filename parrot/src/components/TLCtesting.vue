<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  <option v-for="year in birthYear" :key="year">{{ year }}</option>
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

function filterByYear(list, value) {
  let filterlist = null;
  let babies = 0;
  filterlist = list.filter((filtering) => filtering.birth_year === value);
  filterlist.forEach((push) => (babies += parseInt(push.births)));
  console.log(filterlist);
  birthYear.push(value);
  babiesBorn.push(babies);
}
await getData();

data.forEach((sort) => createSet(sort, valueList));
console.log(valueList);

console.log(birthYear, babiesBorn);

valueList.forEach((add) => filterByYear(data, add));
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: birthYear,
        datasets: [
          {
            label: "Data Set",
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
