<template>
  <div id="container">
    <!-- when anything in this div changes, @change will be run -->
    <div id="controls" @change="filter">
      <label>
        select a race
        <select
          id="ethcty"
          :ref="
            (el) => {
              filterElements.race = el;
            }
          "
        >
          <option v-for="race in races" :key="race">{{ race }}</option>
          <option>all</option>
        </select>
      </label>
      <label>
        select a gender
        <select
          id="gndr"
          :ref="
            (el) => {
              filterElements.gender = el;
            }
          "
        >
          <option v-for="gender in genders" :key="gender">{{ gender }}</option>
          <option>all</option>
        </select>
      </label>
      <label>
        year
        <input
          type="number"
          id="brth_yr"
          :ref="
            (el) => {
              filterElements.birthYear = el;
            }
          "
          value="2015"
        />
      </label>
    </div>
    <code v-if="loaded">{{ babies }}</code>
    <h1 v-else>wait... i am consulting all of New York's babies</h1>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
const loaded = ref(false);
const races = ref([]);
const genders = ref([]);
const birthYears = ref([]);
let data = [];
const babies = ref(null);

const filterElements = reactive({});

async function getBabiesOfYear(year) {
  loaded.value = false;
  try {
    const fData = await fetch(`https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=${year}&$limit=50000&$$app_token=vPn84B6xK76CNcZ4XvQH3Oz0j`);
    const jData = await fData.json();
    if (jData.hasOwnProperty("error")) {
      throw new Error(`api error :( - ${jData.message}`);
    }
    loaded.value = true;
    return jData;
  } catch (e) {
    // probably should have better error handling
    alert(`SOMETHING WENT WRONG. CALL FRED ${e}`);
  }
}

async function refetch() {
  console.log("reloading");
  data = await getBabiesOfYear(filterElements.birthYear.value);
  babies.value = data;
}

// get all possible values of a column
function getValuesOfColumn(column, data) {
  return new Set(
    data.map((baby) => {
      return baby[column];
    })
  );
}

async function filter() {
  await refetch();
  Object.values(filterElements).forEach((filterElement) => {
    console.log(filterElement);
    data = filterBy(data, filterElement.id, filterElement.value);
  });
  babies.value = data;
}

function filterBy(data, property, value) {
  if (value == "all") {
    return data;
  }
  return data.filter((baby) => {
    return baby[property] === value;
  });
}

onMounted(async () => {
  data = await getBabiesOfYear(2015);
  races.value = getValuesOfColumn("ethcty", data);
  genders.value = getValuesOfColumn("gndr", data);
  birthYears.value = getValuesOfColumn("brth_yr", data);
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
