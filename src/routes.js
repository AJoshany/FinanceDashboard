import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./components/Dashboard/Dashboard.vue";
import Login from "./components/Login/Login.vue";
import SignUp from "./components/Login/SignUp.vue";
import { useAuthStore } from "./stores/auth";
import { supabase } from "./supabase";
import { createPinia } from "pinia";

const pinia = createPinia();
const authStore = useAuthStore(pinia);

async function isLogin() {
  await authStore.fetchUser();

  if (authStore.user) return true;
  return false;
}
const routes = [
  {
    path: "/",
    component: Login,
    beforeEnter: async (to, from, next) => {
      if (await isLogin()) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    component: SignUp,
    beforeEnter: async (to, from, next) => {
      if (await isLogin()) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: async (to, from, next) => {
      if (await isLogin()) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
