<template>
  <div class="top-nav-main" :class="{ 'black-back': mobileToggler }">
    <button @click="toggleHandler" v-if="mobileToggler">
      <i class="fa fa-times" aria-hidden="true"></i>
    </button>

    <nav class="top-nav" v-if="mobileToggler">
      <div class="top-nav__container">
        <router-link to="/dashboard">Home</router-link>
        <router-link to="/transactions">Transactions</router-link>
        <router-link to="/dashboard">About</router-link>
      </div>
      <router-link @click="handleLogOut" to="/">logout</router-link>
      <!-- <a @click="handleLogOut">logout</a> -->
    </nav>

    <button @click="toggleHandler" v-else>
      <i class="fa fa-bars" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, Transition } from "vue";
import { useAuthStore } from "../../stores/auth";

let mobileToggler = ref(false);
const authStore = useAuthStore();

function toggleHandler() {
  mobileToggler.value = !mobileToggler.value;
}
async function handleLogOut() {
  await authStore.signOut();
  router.push("/");
}
</script>

<style scoped>
.top-nav-main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.black-back {
  background-color: rgba(0, 0, 0, 0.9);
  bottom: 0;
  z-index: 10;
}

.top-nav-main button {
  padding: 15px;
  width: 100%;
  background-color: rgba(0, 0, 0, 1);
  border-bottom: 4px solid white;
  z-index: 100;
}
.top-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
}
.top-nav__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.top-nav a {
  width: 100%;

  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom: 3px solid rgba(255, 255, 255, 0.7);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
