<template>
  <div id="container">
    <!-- when anything in this div changes, @change will be run -->
    <div id="controls" @change="reload">
      <label>
        select a name
        <select id="nm" v-model="nm">
          <option v-for="name in Object.keys(babyNames)" :key="name">{{ name }}</option>
        </select>
      </label>
    </div>
    <PieChart v-if="loaded" :data="Object.values(babyNames[nm])" :labels="Object.keys(babyNames[nm])">{{ babies }}</PieChart>
    <h1 v-else>wait... i am consulting all of New York's babies</h1>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import PieChart from "@/components/PieChart.vue";
const loaded = ref(false);
let data = [];
const babies = ref(null);
let babyNames = reactive({});
let years = reactive([]);
const nm = ref("");

async function reload() {
  loaded.value = false;
  const data = await fetchData(nm);
  countRaces(data);
  loaded.value = true;
}

async function fetchData(name) {
  try {
    const fData = await fetch(`https://data.cityofnewyork.us/resource/25th-nujf.json?nm=${name}&$limit=50000&$$app_token=vPn84B6xK76CNcZ4XvQH3Oz0j`);

    const jData = await fData.json();
    if (jData.hasOwnProperty("error")) {
      throw new Error(`api error :( - ${jData.message}`);
    }
    const nameMap = {
      "ASIAN AND PACI": "ASIAN AND PACIFIC ISLANDER",
      "BLACK NON HISP": "BLACK NON HISPANIC",
      "WHITE NON HISP": "WHITE NON HISPANIC",
    };
    jData.forEach((baby) => {
      baby.nm = baby.nm.toUpperCase();
      baby.ethcty = nameMap[baby.ethcty] ?? baby.ethcty;
    });
    console.log(jData);
    return jData;
  } catch (e) {
    // probably should have better error handling
    alert(`SOMETHING WENT WRONG. CALL FRED ${e}`);
  }
}

function countRaces(data) {
  data.forEach((baby) => {
    data[baby.ethcty] ??= 0;
    data[baby.ethcty] += Number(baby.cnt);
  });
  console.log(babyNames);
}

function filterBy(data, property, value) {
  if (value === "all") return data;
  console.log(property);
  return data.filter((baby) => String(baby[property]) === String(value));
}

async function getValuesOfColumn(column) {
  // EVIL spaces in a url
  const response = await fetch(
    `https://data.cityofnewyork.us/resource/25th-nujf.json?$query=SELECT ${column} GROUP BY ${column} LIMIT 50000&$$app_token=vPn84B6xK76CNcZ4XvQH3Oz0j&`
  );
  return await response.json();
}

onMounted(async () => {
  const yearData = await getValuesOfColumn("brth_yr");
  years = yearData.map((year) => Number(year.brth_yr)).sort((a, b) => a - b);
  const names = await getValuesOfColumn("nm");
  babyNames = names.map((name) => name.nm.toUpperCase()).sort();
  if (!nm.value) {
    console.log("there is no name");
    nm.value = Object.keys(babyNames)[0];
    console.log("selected", nm.value);
  }
  await reload();
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
