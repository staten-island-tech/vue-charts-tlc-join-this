<template>
  <div id="container">
    <!-- when anything in this div changes, @change will be run -->
    <div id="controls" @change="filter">
      <label>
        select a race
        <select
          id="race"
          :ref="
            (el) => {
              filters[el.id] = el;
            }
          "
        >
          <option v-for="race in races" :key="race">{{ race }}</option>
          <option>all</option>
        </select>
      </label>
    </div>
    <code v-if="loaded">{{ babies }}</code>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
const loaded = ref(false);
const races = ref([]);
let data = [];
const babies = ref(null);

const filters = reactive({});

async function getBabiesOfYear(year) {
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

// get all possible values of a column
function getValuesOfColumn(column, data) {
  return new Set(
    data.map((baby) => {
      return baby[column];
    })
  );
}

function filter() {
  console.log(filters.race);
}

function filterBy(data, property, value) {
  if (value !== "all") {
    value = data.filter((baby) => {
      return baby[property] === value;
    });
  }
}

onMounted(async () => {
  data = await getBabiesOfYear(2015);
  races.value = getValuesOfColumn("ethcty", data);
  // evil ternary strikes again
  babies.value = data.length ? data : "there is no data...";
});
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
}
</style>
