<script setup>
import BarChart from "../components/BarChart.vue";
const names = ["Lawrence", "Tian Lang", "Jay"];
const data = [1, 50, 2];
</script>

<template>
  <main>
    <BarChart :labels="names" :data="data" />
  </main>
</template>
