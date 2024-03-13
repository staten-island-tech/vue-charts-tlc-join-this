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
      <label>
        year min
        <input type="number" id="brth_yr_min" v-model="filters.brth_yr_min" />
      </label>
      <label>
        year max
        <input type="number" id="brth_yr_max" v-model="filters.brth_yr_max" />
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
let cache = {};
let data = [];
const babies = ref(null);
let babyNames = reactive({});

const filters = reactive({
  brth_yr_min: "2015",
  brth_yr_max: "2015",
});
const nm = ref("");

async function reload() {
  loaded.value = false;
  data = [];
  for (let i = Number(filters.brth_yr_min); i <= Number(filters.brth_yr_max); i++) {
    console.log(i);
    data.push(...(await getBabiesOfYear(i)));
  }
  babyNames = {};
  getValuesOfColumn("nm", data).forEach((name) => {
    babyNames[name] = {};
  });
  if (!nm.value) {
    console.log("there is no name");
    nm.value = Object.keys(babyNames)[0];
    console.log("selected", nm.value);
  }
  countRaces();
  loaded.value = true;
}

async function fetchData(year) {
  if (cache.hasOwnProperty(year)) {
    return cache[year];
  }

  try {
    const fData = await fetch(`https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=${year}&$limit=50000&$$app_token=vPn84B6xK76CNcZ4XvQH3Oz0j`);
    const jData = await fData.json();
    if (jData.hasOwnProperty("error")) {
      throw new Error(`api error :( - ${jData.message}`);
    }
    const nameMap = {
      "ASIAN AND PACI": "ASIAN AND PACIFIC ISLANDER",
      "BLACK NON HISP": "BLACK NON HISPANIC",
      "WHITE NON HISP": "WHITE NON HISPANIC",
    };
    // jData.forEach((baby) => {
    //   baby.nm = baby.nm.toUpperCase();
    //   baby.ethcty = nameMap[baby.ethcty] ?? baby.ethcty;
    // });
    cache[year] = jData;
    console.log(jData);
    return jData;
  } catch (e) {
    // probably should have better error handling
    alert(`SOMETHING WENT WRONG. CALL FRED ${e}`);
  }
}

function countRaces() {
  console.log(getValuesOfColumn("ethcty", data));
  data.forEach((baby) => {
    babyNames[baby.nm][baby.ethcty] ??= 0;
    babyNames[baby.nm][baby.ethcty] += Number(baby.cnt);
  });
  console.log(babyNames);
}

function filterBy(data, property, value) {
  if (value === "all") return data;
  console.log(property);
  return data.filter((baby) => String(baby[property]) === String(value));
}

onMounted(async () => {
  let yearData = await fetch(
    `https://data.cityofnewyork.us/resource/25th-nujf.json?$query=SELECT%20%60brth_yr%60%20GROUP%20BY%20%60brth_yr%60&$$app_token=vPn84B6xK76CNcZ4XvQH3Oz0j`
  );
  test = await test.json();
  console.log(test);
  console.log(test.map((year) => Number(year.brth_yr)).sort((a, b) => a - b));
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
