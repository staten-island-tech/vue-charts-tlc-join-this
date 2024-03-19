<template>
  <main>
    <div class="big">
    <div class="small" @change="rechart">
      <label>
        Select a Filter
        <select id="selection" v-model="selectyear">
           <option value="nuhuh" selected="selected">No Filter</option>
           <option v-for="year in years" :key="year">{{ year }}</option> 
        </select>
      </label>
    </div>
    <Chart v-if="loaded" :data="Object.values(data)" :labels="Object.keys(data)"/>
    <h1 v-else>wait ........</h1>
  </div>
  </main>
</template>

<script setup>
import Chart from "../components/DoChart.vue";
import { onMounted, ref, reactive } from "vue";

const loaded = ref(false);
let data = reactive({});
const babies = ref(null); //data
let years = 
['2007', 
'2008', 
'2009', 
'2010', 
'2011', 
'2012', 
'2013', 
'2014', 
'2015', 
'2016', 
'2017', 
'2018', 
'2019', 
'2020']; //Array with all years

const selectyear = ref(""); //Selection V-model stuff


async function rechart() {
  loaded.value = false;
  console.log(selectyear.value);
  let d = reactive([]);
  if(selectyear.value === 'nuhuh'){
    d = fetchDataNorm()
  }
  else{
    d = await fetchData(selectyear.value);
  }

  console.log(data);
  loaded.value = true;
}

async function fetchDataNorm(){
  try {
        const fetched = await fetch(
          "https://data.cityofnewyork.us/resource/wffy-3iyg.json"
         );
       const jsondata = await fetched.json();
        console.log(jsondata);
    } catch (error) {

  }
}

async function fetchData(year){
      try {
        const fetched = await fetch(
        `https://data.cityofnewyork.us/resource/wffy-3iyg.json?$query=SELECT%0A%20%20%60birth_year%60%2C%0A%20%20%60sex_of_infant%60%2C%0A%20%20%60race_or_ethnicity_of_mother%60%2C%0A%20%20%60births%60%2C%0A%20%20%60percentage%60%0AWHERE%20%60birth_year%60%20IN%20(${year})%0AORDER%20BY%20%60birth_year%60%20ASC%20NULL%20LAST`
      );
       const jsondata = await fetched.json();
        console.log(jsondata);
    } catch (error) {

  }
}

/* function countRaces(nmData) {
  data = {};
  nmData.forEach((baby) => {
    data[baby.race_or_ethnicity_of_mother] ??= 0;
    data[baby.race_or_ethnicity_of_mother] += Number(baby.births);
  });
  console.log(data);
} */

onMounted(async () => {
  await rechart();
});




</script>



<style scoped>

</style>
