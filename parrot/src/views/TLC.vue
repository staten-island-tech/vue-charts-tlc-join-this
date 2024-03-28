<template>
  <p>{{ loaded ? "true 👍" : "false 👎" }}</p>
  <TLC v-if="loaded" :chartData="object1" :chartOptions="object2" />
  <h1 v-else>wait ........</h1>
</template>

<script setup>
import TLC from "../components/Props.vue";
import { ref, reactive, onMounted } from "vue";

let list2 = [];
const loaded = ref(false);
const valueList = new Set();
let data = null;
let birthYear = [];
let babiesBorn = [];
let object1 = reactive({});
let object2 = reactive({});
async function getData() {
  loaded.value = false;
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
  filterlist.forEach((push) => (babies += Number(push.births)));
  console.log(filterlist);
  birthYear.push(value);
  babiesBorn.push(babies);
}
async function createAll() {
  await getData();

  data.forEach((sort) => createSet(sort, valueList));
  console.log(valueList);

  console.log(birthYear, babiesBorn);

  valueList.forEach((add) => filterByYear(data, add));

  object1 = {
    labels: birthYear,
    datasets: [
      {
        data: babiesBorn,
        label: "Babies Born By Year",
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
      },
    ],
  };

  object2 = {
    responsive: true,
  };
  loaded.value = true;
}

onMounted(async () => {
  await createAll();
});
</script>

<style scoped></style>
