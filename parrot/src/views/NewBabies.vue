<script setup>
import BabyYear from "@/views/Newbars.vue";

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
    <BabyYear :chartData="object1" :chartOptions="object2" />
  </main>
</template>
