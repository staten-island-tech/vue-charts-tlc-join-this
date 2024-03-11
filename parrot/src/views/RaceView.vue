<script setup>
import { onMounted } from "vue";
import RaceChart from "../components/RaceChart.vue";

let babystuff = undefined;
async function babystealing() {
  try {
    const response = await fetch(
      "https://data.cityofnewyork.us/resource/wffy-3iyg.json"
    );
    if (response.status != 200) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    babystuff = data;
  } catch (error) {}
}

const raceData = {}
let races = []

onMounted(async () => {
  await babystealing();
  console.log(babystuff);
  
  babystuff.forEach((baby) => {
    // if it doesn't already exist, create empty array
    raceData[baby.race_or_ethnicity_of_mother] ??= [];
    // add baby
    raceData[baby.race_or_ethnicity_of_mother].push(baby)
  });
  console.log(raceData);

  races = Object.keys(raceData)
  const a = new Array(6); //new Empty array
  a.fill(0)
  console.log(a);
  // this goes through all races and adds to respective race
  // chart takes array like labels=["white",.....] and data=[123879823,....].
  // then chart will say "ok white babies have 123879823 births"
  babystuff.forEach((baby) => {
    a[races.indexOf(baby.race_or_ethnicity_of_mother)] += Number(baby.births);    // births was a STRING
  })
  console.log(races);
  console.log(a)

});
</script>

<template>
  <main>
    <!-- PUT PROPERTIES HERE AFTER DEFINING IN RaceChart.vue -->
    <RaceChart :racelabels ="races" :racedata = "a"/>
    
    <form action="/action_page.php">
  <label for="pies">Choose a filter:</label>
  <select name="pies" id="pies">
    <optgroup label="Race">
      <option value="White">White</option>
      <option value="Black">Black</option>
      <option value="Asian">Asian/Pacific Islander</option>
      <option value="Hispanic">Hispanic</option>
      <option value="Other">Other</option>
      <option value="Unknown">Unknown</option>
    </optgroup>
  </select>
</form>
  </main>
</template>
