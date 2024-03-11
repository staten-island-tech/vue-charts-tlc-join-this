<script setup>
import PieChart from "../components/PieChart.vue";
const names = ["Lawrence", "Tian Lang", "Jay"];
const data = [1, 50, 2];
</script>

<template>
  <main>
    <PieChart :labels="names" :data="data" />
  </main>
</template>
