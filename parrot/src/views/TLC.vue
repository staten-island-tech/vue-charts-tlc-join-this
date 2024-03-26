<template>
  <TLC />
</template>

<script>
import TLC from "../components/Props.vue";
import { ref, reactive, onMounted } from "vue";

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
  filterlist.forEach((push) => (babies += Number(push.births)));
  console.log(filterlist);
  birthYear.push(value);
  babiesBorn.push(babies);
}
await getData();

data.forEach((sort) => createSet(sort, valueList));
console.log(valueList);

console.log(birthYear, babiesBorn);

valueList.forEach((add) => filterByYear(data, add));

onMounted(() => {
  const object1 = reactive({
    labels: birthYear,
    datasets: [{ data: babiesBorn }],
  });

  const object2 = reactive({
    responsive: true,
  });
});
</script>

<style scoped></style>
