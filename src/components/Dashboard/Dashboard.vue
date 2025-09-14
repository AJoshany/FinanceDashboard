<template>
  <div>
    <NavBar />
    <button @click="handleLogOut">logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import NavBar from "../NavBar/NavBar.vue";

const authStore = useAuthStore();

const router = useRouter();

async function handleLogOut() {
  await authStore.signOut();
  router.push("/");
}
</script>

<style></style>
