import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RaceView from "../views/RaceView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/babynames",
      name: "babynames",
      component: () => import("../views/BabyNames.vue"),
      props: true,
    },
    {
      path: "/raceview",
      name: "raceview",
      component: RaceView,
    },
  ],
});

export default router;
