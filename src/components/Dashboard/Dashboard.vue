<template>
  <div>
    <div>asdfas</div>
    <button @click="handleLogOut">logout</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

async function handleLogOut() {
  await authStore.signOut();
}
</script>

<style></style>
