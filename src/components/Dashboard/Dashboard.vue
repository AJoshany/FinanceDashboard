<template>
  <div>
    <div>asdfas</div>
    <button @click="handleLogOut">logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const router = useRouter();

async function handleLogOut() {
  await authStore.signOut();
  router.push("/");
}
</script>

<style></style>
