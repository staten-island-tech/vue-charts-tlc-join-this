<template>
  <div id="container">
    <!-- when anything in this div changes, @change will be run -->
    <div id="controls" @change="reload">
      <label>
        select a name
        <select id="nm" v-model="nm">
          <option v-for="name in babyNames" :key="name">{{ name }}</option>
        </select>
      </label>
    </div>
    <PieChart v-if="loaded" :data="Object.values(data)" :labels="Object.keys(data)">{{ babies }}</PieChart>
    <h1 v-else>wait... i am consulting all of New York's babies</h1>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import PieChart from "@/components/PieChart.vue";
const loaded = ref(false);
let data = reactive({});
const babies = ref(null);
let babyNames = reactive([]);
let years = reactive([]);
const url = new URL(document.location);
const nm = ref(url.searchParams.has("name") ? url.searchParams.get("name").toUpperCase() : "");

async function reload() {
  loaded.value = false;

  const params = url.searchParams;
  if (!params.get("name") || params.get("name").toUpperCase() !== nm.value.toUpperCase()) {
    params.set("name", nm.value);
    window.location = url.pathname + "?" + params.toString();
    return;
  }
  const d = await fetchData(nm.value);
  countRaces(d);
  loaded.value = true;
}

async function fetchData(name) {
  const fData = await fetch(
    `https://data.cityofnewyork.us/resource/25th-nujf.json?$query=SELECT%20%60brth_yr%60%2C%20%60gndr%60%2C%20%60ethcty%60%2C%20%60nm%60%2C%20%60cnt%60%2C%20%60rnk%60%0AWHERE%20caseless_eq(%60nm%60%2C%20%22${name}%22)%0AORDER%20BY%0A%20%20%60brth_yr%60%20DESC%20NULL%20FIRST%2C%0A%20%20%60gndr%60%20ASC%20NULL%20LAST%2C%0A%20%20%60ethcty%60%20ASC%20NULL%20LAST%2C%0A%20%20%60rnk%60%20ASC%20NULL%20LAST`
  );

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
  return jData;
}

function countRaces(nmData) {
  data = {};
  nmData.forEach((baby) => {
    data[baby.ethcty] ??= 0;
    data[baby.ethcty] += Number(baby.cnt);
  });
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

  babyNames = Array.from(new Set((await getValuesOfColumn("nm")).map((name) => name.nm.toUpperCase()))).sort();

  if (!nm.value || !babyNames.includes(nm.value)) {
    nm.value = babyNames[0];
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
