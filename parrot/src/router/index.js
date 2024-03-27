import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RaceView.vue"),
    },
  ],
});

export default router;
