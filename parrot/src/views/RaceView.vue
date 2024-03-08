<script setup>
import { onMounted } from "vue";
import RaceChart from "../components/RaceChart.vue";

let babystuff = [];
async function babystealing() {
  try {
    const response = await fetch(
      "https://data.cityofnewyork.us/resource/wffy-3iyg.json?$query=SELECT%20birth_year%2C%20sex_of_infant%2C%20race_or_ethnicity_of_mother%2C%20births%2C%20percentage"
    );
    if (response.status != 200) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    babystuff.push(data);
    console.log(babystuff);
  } catch (error) {}
}

onMounted(async () => {
  await babystealing();

  const white = babystuff.filter((race) => {
    return race["race_or_ethnicity_of_mother"] === "Hispanic";
  });

  console.log(white);
});
</script>

<template>
  <main>
    <RaceChart />
  </main>
</template>
