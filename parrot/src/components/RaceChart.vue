<template>
    <main>
        <Doughnut 
        :data="chartData" 
        :options="chartOptions" />
    </main>
  </template>
  
  <script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'


ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: {
    Doughnut
  },  
  data() {
    return {
      chartData: {
        labels: [ 'Red', 'Blue', 'Yellow' ],
        datasets: [ { 
          label: "cool",
          data: [40, 20, 12],
          backgroundColor: ['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)'],
          hoverOffset: 4
        } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }

}
  </script>
  
  <style scoped></style>