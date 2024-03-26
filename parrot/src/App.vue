<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="sidebar">
    <nav>
      <h2>⠀ ／l、</h2>
      <h2>（ﾟ､ ｡ ７ tiger cat</h2>
      <h2>⠀ l、ﾞ ~ヽ</h2>
      <h2>   じしf_, )ノ</h2>
      <RouterLink to="/">TLC jumps high</RouterLink>
      <RouterLink to="/race">Babies by Ethnicity</RouterLink>
    </nav>
  </div>
  <div class="chartwrap">
    <RouterView />
  </div>
</template>

<style scoped>
.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
  z-index: 99;
}

.sidebar RouterLink {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

/* Horizontal media stuff */
@media screen and (max-width: 4000px) {
  div.chartwrap {
    position: absolute;
    top: 10%;
    left: 40%;
    margin-top: -50px;
    margin-left: -50px;
    width: 800px;
    height: 800px;
  }
}

/* Vertical media stuff */
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  div.chartwrap {
    margin-left: 0;
    top: 20%;
    left: 10%;
    width: 500px;
    height: 500px;
  }
}
</style>
