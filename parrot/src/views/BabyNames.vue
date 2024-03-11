<template>
  <div id="container">
    <!-- when anything in this div changes, @change will be run -->
    <div id="controls" @change="filter">
      <label>
        select a race
        <select id="ethcty" v-model="filters.ethcty">
          <option v-for="race in options.ethcty" :key="race">{{ race }}</option>
          <option>all</option>
        </select>
      </label>
      <label>
        select a gender
        <select id="gndr" v-model="filters.gndr">
          <option v-for="gender in options.gndr" :key="gender">{{ gender }}</option>
          <option>all</option>
        </select>
      </label>
      <label>
        year
        <input type="number" id="brth_yr" v-model="filters.brth_yr" value="2015" />
      </label>
    </div>
    <PieChart v-if="loaded" :data="Object.values(babyNames)" :labels="Object.keys(babyNames)">{{ babies }}</PieChart>
    <h1 v-else>wait... i am consulting all of New York's babies</h1>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import PieChart from "@/components/PieChart.vue";
const loaded = ref(false);
let cache = {};
let data = [];
const babies = ref(null);

const options = reactive({
  brth_yr: [],
  ethcty: [],
  gndr: [],
});

const filters = reactive({
  brth_yr: "2015",
  ethcty: "all",
  gndr: "all",
});

async function getBabiesOfYear(year) {
  loaded.value = false;
  if (cache.hasOwnProperty(year)) {
    return cache[year];
  }

  try {
    const fData = await fetch(`https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=${year}&$limit=50000&$$app_token=vPn84B6xK76CNcZ4XvQH3Oz0j`);
    const jData = await fData.json();
    if (jData.hasOwnProperty("error")) {
      throw new Error(`api error :( - ${jData.message}`);
    }
    cache[year] = jData;
    console.log(jData);
    return jData;
  } catch (e) {
    // probably should have better error handling
    alert(`SOMETHING WENT WRONG. CALL FRED ${e}`);
  }
}

async function fetchData() {
  data = await getBabiesOfYear(filters.brth_yr);
  babyNames = {};
  countBabies(data);
}

// get all possible values of a column
function getValuesOfColumn(column, data) {
  // sort by alphabet + remove duplicates
  return new Set(data.map((baby) => baby[column]).sort());
}

async function filter() {
  await fetchData();
  for (const key in filters) {
    data = filterBy(data, key, filters[key]);
  }
  babies.value = data;
}

let babyNames = {};
function countBabies(data) {
  data.forEach((baby) => {
    babyNames[baby.nm] ??= 0;
    babyNames[baby.nm]++;
  });
  loaded.value = true;
}

function filterBy(data, property, value) {
  if (value === "all") return data;
  console.log(property);
  return data.filter((baby) => String(baby[property]) === String(value));
}

onMounted(async () => {
  await fetchData();
  options.ethcty = getValuesOfColumn("ethcty", data);
  options.gndr = getValuesOfColumn("gndr", data);
  options.brth_yr = getValuesOfColumn("brth_yr", data);
  // evil ternary strikes again
  babies.value = data.length ? data : "there is no data...";
});
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
}
#controls {
  display: flex;
  flex-direction: column;
}
label {
  margin-right: 10px;
}
</style>
