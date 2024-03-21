<template>
  <main>
    <div class="big">
      <Chart v-if="loaded" :data="Object.values(babies)" :labels="Object.keys(babies)" />
      <h1 v-else>wait ........</h1>
      <div class="small" @change="rechart">
        <label>
          Select a Filter
          <select id="selection" v-model="selectyear">
            <option value="nuhuh">No Filter</option>
            <option v-for="year in years" :key="year">{{ year }}</option>
          </select>
        </label>
      </div>
    </div>
  </main>
</template>

<script setup>
// ⠀ ／l、
// （ﾟ､ ｡ ７ tiger cat
// ⠀ l、ﾞ ~ヽ
//   じしf_, )ノ
import Chart from "../components/DoChart.vue";
import { onMounted, ref, reactive } from "vue";
const loaded = ref(false);
let d = reactive([]);
const babies = ref(null); //data
let years = []; //Array for all years for dropdown select
const selectyear = ref("nuhuh"); //Selection V-model stuff

async function rechart() {
  loaded.value = false;
  var props = Object.getOwnPropertyNames(babies);
  for (var i = 0; i < props.length; i++) {
    delete babies[props[i]];
  }

  for (var key in babies) {
    delete babies[key];
  }

  console.log(selectyear.value);
  if (selectyear.value === "nuhuh") {
    d = await fetchDataNorm();
  } else {
    d = await fetchData(selectyear.value);
  }
  console.log(d);
  d.forEach((baby) => {
    babies[baby.race_or_ethnicity_of_mother] ??= 0;
    babies[baby.race_or_ethnicity_of_mother] += Number(baby.births);
  });
  console.log(babies);
  console.log(Object.keys(babies));
  console.log(Object.values(babies));
  delete babies.__v_isRef;
  loaded.value = true;
}

async function fetchDataNorm() {
  //all 152 datapoints
  try {
    const fetched = await fetch("https://data.cityofnewyork.us/resource/wffy-3iyg.json");
    const jsondata = await fetched.json();
    return jsondata;
  } catch (error) {}
}
async function fetchData(year) {
  //filtered datapoints by year
  try {
    const fetched = await fetch(
      `https://data.cityofnewyork.us/resource/wffy-3iyg.json?$query=SELECT%0A%20%20%60birth_year%60%2C%0A%20%20%60sex_of_infant%60%2C%0A%20%20%60race_or_ethnicity_of_mother%60%2C%0A%20%20%60births%60%2C%0A%20%20%60percentage%60%0AWHERE%20%60birth_year%60%20IN%20(${year})%0AORDER%20BY%20%60birth_year%60%20ASC%20NULL%20LAST`
    );
    const jsondata = await fetched.json();
    return jsondata;
  } catch (error) {}
}

onMounted(async () => {
  const fetchYears = await fetch(
    "https://data.cityofnewyork.us/resource/wffy-3iyg.json?$query=SELECT%20%60birth_year%60%0AGROUP%20BY%20%60birth_year%60%0AORDER%20BY%20%60birth_year%60%20ASC%20NULL%20LAST"
  );
  years = await fetchYears.json();
  years = years.map((yr) => yr.birth_year);
  await rechart();
});
</script>

<style scoped></style>
