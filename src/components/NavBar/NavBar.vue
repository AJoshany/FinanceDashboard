<template>
  <div class="top-nav-main" :class="{ 'black-back': mobileToggler }">
    <button @click="toggleHandler" v-if="mobileToggler">
      <i class="fa fa-times" aria-hidden="true"></i>
    </button>
    <Transition name="fade" v-if="mobileToggler">
      <nav class="top-nav">
        <router-link to="/dashboard">Home</router-link>
        <router-link to="/transactions">Transactions</router-link>
        <router-link to="/dashboard">About</router-link>
      </nav>
    </Transition>
    <button @click="toggleHandler" v-else>
      <i class="fa fa-bars" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, Transition } from "vue";

let mobileToggler = ref(false);

function toggleHandler() {
  mobileToggler.value = !mobileToggler.value;
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
}

.black-back {
  background-color: rgba(0, 0, 0, 0.6);
  bottom: 0;
}

.top-nav-main button {
  padding: 15px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-bottom: 4px solid white;
}
.top-nav {
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
