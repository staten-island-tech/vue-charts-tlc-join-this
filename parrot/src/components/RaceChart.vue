<template>
  <main>
    <Doughnut :data="chartData" :options="chartOptions" />
  </main>
</template>

<script>

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);

let babystuff2 = undefined;
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
    babystuff2 = data;
  } catch (error) {}
}

async function filtering(){
  await babystealing();
  babystuff = babystuff2.filter((baby) => baby.birth_year === '2007')
}

  const raceData = {}
  let races = [];

  await filtering();
  console.log(babystuff);
  
  babystuff.forEach((baby) => {
    // if it doesn't already exist, create empty array
    raceData[baby.race_or_ethnicity_of_mother] ??= [];
    // add baby
    raceData[baby.race_or_ethnicity_of_mother].push(baby)
  });
  console.log(raceData);
  const a = new Array(6); //new Empty array
  a.fill(0)
  console.log(a); 

  races = Object.keys(raceData)

  // this goes through all races and adds to respective race
  // chart takes array like labels=["white",.....] and data=[123879823,....].
  // then chart will say "ok white babies have 123879823 births"
  babystuff.forEach((baby) => {
    a[races.indexOf(baby.race_or_ethnicity_of_mother)] += Number(baby.births);    // births was a STRING
  })
  console.log(races);
  console.log(a);

  export default {
    name: "byRace",
    components: { Doughnut },
    data(){
      return{
        chartData: {
          labels: ['White', 'Other', 'Hispanic', 'Black', 'Asian / Pacific Islander', 'Unknown',],
          datasets: [
            {
              label: "Number of babies born",
              backgroundColor:['#1b1c6b', '#1e0f53', '#2539bd', '#5055b6', '#848bf2', '#a6b0fe'],
              data: a,
              hoverOffset: 4
            },
          ],
        },
        chartOptions: {
          responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Babies sorted by race. 2017 to 2020"
          }
        }
      }
      }
    }
  }

</script>

<style scoped>
*{
  background-color: aliceblue;
}
</style>
