import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home/Home.vue";
import CategoryContainer from "@/components/Category/CategoryContainer.vue";
import NotFound from "@/PageNotFound.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/categor/:id",
      name: "category",
      component: CategoryContainer,
    },
    {
      path: "/categor/:id/sub-category/:sid",
      name: "category-sub",
      component: CategoryContainer,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});

export default router;
