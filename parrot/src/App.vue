<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/race">Race</RouterLink>
    </nav>
  </div>
  <div class="chartwrap" style="margin-left: 25%">
    <RouterView />
  </div>
</template>

<style scoped></style>
