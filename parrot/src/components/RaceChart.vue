<template>
  <main>
    <Doughnut :data="chartData" :options="chartOptions" />
    <form v-if="!isFetching">
      <label for="pies">Choose a filter:</label>
      <select name="pies" id="pies">
        <optgroup label="Year" id="Filling">
          <option value="nuhuh">No Filter</option>
          <option v-for="year in applesauce" :key="year">{{ year }}</option>
        </optgroup>
      </select>
    </form>
  </main>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ref } from "vue";
import { Doughnut } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);
const isFetching = ref(true);
let babystuff2 = undefined;
let babystuff = undefined;
const applesauce = new Set();
const raceData = {};
let races = [];

async function babystealing() {
  try {
    const response = await fetch("https://data.cityofnewyork.us/resource/wffy-3iyg.json");
    if (response.status != 200) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    babystuff2 = data;
  } catch (error) {}
}

async function filtering() {
  await babystealing();
  babystuff2.forEach((baby) => applesauce.add(baby.birth_year));
  isFetching.value = false;

  babystuff = babystuff2.filter((baby) => baby.birth_year);
}

await filtering();


babystuff.forEach((baby) => {
  // if it doesn't already exist, create empty array
  raceData[baby.race_or_ethnicity_of_mother] ??= [];
  // add baby
  raceData[baby.race_or_ethnicity_of_mother].push(baby);
});

const a = new Array(6); //new Empty array
a.fill(0);


races = Object.keys(raceData);

// this goes through all races and adds to respective race
// chart takes array like labels=["white",.....] and data=[123879823,....].
// then chart will say "ok white babies have 123879823 births"
babystuff.forEach((baby) => {
  a[races.indexOf(baby.race_or_ethnicity_of_mother)] += Number(baby.births); // births was a STRING
});


export default {
  name: "byRace",
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: ["White", "Other", "Hispanic", "Black", "Asian / Pacific Islander", "Unknown"],
        datasets: [
          {
            label: "Number of babies born",
            backgroundColor: ["#1b1c6b", "#1e0f53", "#2539bd", "#5055b6", "#848bf2", "#a6b0fe"],
            data: a,
            hoverOffset: 4,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Babies sorted by race. 2017 to 2020",
          },
        },
      },
    };
  },
};
</script>

<style scoped>
* {
  background-color: aliceblue;
}
</style>
