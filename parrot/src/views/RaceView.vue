<template>
  <div class="container">
    <!--when change occurs inside, @change runs-->
    <div class="controls" @change="refreshchart">
      <label> Select a filter </label>
      <select name="pies" id="pies" v-model="filter">
        <optgroup label="Year">
          <option value="nuhuh">No Filter</option>
          <option v-for="year in applesauce" :key="year">{{ year }}</option>
        </optgroup>
      </select>
    </div>
    <Doughnut v-if="loaded" :data="Object.values(data)" :labels="Object.keys(data)" />
    <h1 v-else>... ... ... ... wait.</h1>
  </div>
</template>

<script setup>
import Doughnut from "../components/DoChart.vue";
import { onMounted, ref, reactive } from "vue";

const loaded = ref(false);
let data = reactive({});

async function refreshchart() {
  loaded.value = false;

  loaded.value = true;
}

async function fetchData(year) {
  try {
    const fetchdata = await fetch(
      "https://data.cityofnewyork.us/resource/wffy-3iyg.json?$query=SELECT%0A%20%20%60birth_year%60%2C%0A%20%20%60sex_of_infant%60%2C%0A%20%20%60race_or_ethnicity_of_mother%60%2C%0A%20%20%60births%60%2C%0A%20%20%660percentage%60%0AWHERE%20%60birth_year%60%20IN%20(%222018%22)%0AORDER%20BY%20%60birth_year%60%20ASC%20NULL%20LAST"
    );
  } catch (error) {}
}
</script>

<style scoped></style>
