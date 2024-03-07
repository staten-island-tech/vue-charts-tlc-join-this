<template>
  <div>
    <code>{{ babies }}</code>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const babies = ref(null);
async function getBabiesOfYear(year) {
  const data = await fetch(`https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=${year}`);
  return await data.json();
}
onMounted(async () => {
  babies.value = await getBabiesOfYear(2015);
});
</script>

<style lang="scss" scoped></style>
