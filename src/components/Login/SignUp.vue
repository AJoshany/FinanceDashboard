<template>
  <div class="login-page">
    <div class="form" v-if="!authStore.isLoading">
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
        <button type="submit" class="submit-btn">Sign Up</button>
        <p class="message">
          Already registered? <RouterLink to="/">Login</RouterLink>
        </p>
      </Form>
    </div>
    <div v-else>
      <div class="loading-backdrop"></div>
      <div class="loading-container">Loading ....</div>
    </div>
  </div>
</template>

<script setup>
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import "./Login.css";
import { required } from "@vee-validate/rules";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";

defineRule("required", required);

const username = ref("");
const password = ref("");
const router = useRouter();

const authStore = useAuthStore();

async function handleSubmit() {
  const data = await authStore.signUp(username.value, password.value);
  if (data) {
    alert("Sign Up Successfully");
    router.push("/dashboard");
  } else {
    alert("Invalid");
  }
}
</script>

<style></style>
