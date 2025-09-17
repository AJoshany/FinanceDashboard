<template>
  <div class="top-nav-main" :class="{ 'black-back': mobileToggler }">
    <div class="nav-icons">
      <div>
        <router-link to="/dashboard"
          ><i class="fa fa-home" aria-hidden="true"></i
        ></router-link>
        <router-link @click="trancStore.showForm = true" to="/transactions"
          ><i class="fa fa-plus" aria-hidden="true"></i
        ></router-link>
      </div>
      <div>
        <button @click="toggleHandler" v-if="mobileToggler">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
        <button @click="toggleHandler" v-else>
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <nav class="top-nav" v-if="mobileToggler">
      <div class="top-nav__container">
        <router-link to="/dashboard">Home</router-link>
        <router-link @click="trancStore.showForm = true" to="/transactions"
          >Transactions</router-link
        >
        <router-link to="/dashboard">About</router-link>
      </div>
      <router-link @click="handleLogOut" to="/">logout</router-link>
      <!-- <a @click="handleLogOut">logout</a> -->
    </nav>
  </div>
</template>

<script setup>
import { ref, Transition } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useTrancStore } from "../../stores/transactions";

let mobileToggler = ref(false);
const authStore = useAuthStore();
const trancStore = useTrancStore();

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

.nav-icons {
  background-color: rgba(0, 0, 0, 1);
  border-bottom: 4px solid white;
  width: 100%;
  height: 60px;
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.nav-icons div {
  display: flex;
  gap: 20px;
}

.nav-icons {
  font-size: 20px;
}

.top-nav-main button {
  text-align: right;
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
