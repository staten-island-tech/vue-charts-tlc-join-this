<script setup>
import RaceChart from "../components/RaceChart.vue";


let babystuff = [];
async function babystealing(){
    try {
        const response = await fetch('https://data.cityofnewyork.us/resource/wffy-3iyg.json?$query=SELECT%20birth_year%2C%20sex_of_infant%2C%20race_or_ethnicity_of_mother%2C%20births%2C%20percentage')
        if (response.status != 200) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    babystuff.push(data);
    console.log(babystuff);
    } catch (error) {
    }
}

babystealing();


</script>

<template>
  <main>
    <RaceChart :labels="names" :data="data" />
  </main>
</template>
