<template>
  <div class="login-page">
    <div class="form">
      <Form class="login-form" @submit="handleSubmit">
        <div class="login-input">
          <Field
            type="email"
            placeholder="email"
            name="username"
            rules="required"
            v-model="username"
          />
          <ErrorMessage class="error" name="username" />
        </div>

        <div class="login-input">
          <Field
            type="password"
            placeholder="password"
            name="pass"
            rules="required"
            v-model="password"
          />
          <ErrorMessage name="pass" class="error" />
        </div>
        <button type="submit" class="submit-btn">login</button>
        <p class="message">
          Not registered?
          <RouterLink to="/signup">Create an account</RouterLink>
        </p>
      </Form>
    </div>
    <div v-show="authStore.isLoading">
      <div class="loading-backdrop"></div>
      <div class="loading-container">Loading ....</div>
    </div>
  </div>
</template>

<script setup>
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import "./Login.css";
import { required } from "@vee-validate/rules";
import { ref } from "vue";

import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const username = ref("");
const password = ref("");

const authStore = useAuthStore();

const router = useRouter();
defineRule("required", required);

async function handleSubmit() {
  const loginResult = await authStore.signIn(username.value, password.value);
  console.log(loginResult);
  if (loginResult) {
    alert("login successfully");
    router.push("/dashboard");
  } else {
    alert("Invalid User Data");
  }
}
</script>

<style></style>
