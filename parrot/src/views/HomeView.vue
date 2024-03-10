<script setup>
import BarChart from "../components/BarChart.vue";
import TLCtesting from "@/components/TLCtesting.vue";
const object1 = {
  labels: ["January", "February", "March"],
  datasets: [{ data: [40, 20, 45] }],
};

const object2 = {
  responsive: true,
};
</script>

<template>
  <main>
    <!-- <TLCtesting :chartData="object1" :chartOptions="object2" /> -->
    <TLCtesting />
  </main>
</template>
