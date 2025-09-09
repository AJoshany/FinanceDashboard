import Dashboard from "./components/Dashboard/Dashboard.vue";
import Login from "./components/Login/Login.vue";
import SignUp from "./components/Login/SignUp.vue";

function isLogin() {
  const user = localStorage.getItem("currentUser") || null;
  if (user) return true;
  return false;
}
const routes = [
  {
    path: "/",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isLogin()) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    component: SignUp,
    beforeEnter: (to, from, next) => {
      if (isLogin()) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (isLogin) {
        next();
      } else {
        next("/");
      }
    },
  },
];
