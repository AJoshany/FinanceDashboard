import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("currentUser") || null));
  const isLoading = ref(false);

  function setUser(newUser) {
    user.value = newUser;
    if (newUser) {
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  async function fetchUser() {
    isLoading.value = true;
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      setUser(null);
    } else {
      setUser(data.user);
    }
    isLoading.value = false;
  }
  async function signUp(email, password) {
    isLoading.value = true;
    console.log(isLoading.value);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log(error);
      isLoading.value = false;
      return null;
    }
    setUser(data.user);
    isLoading.value = false;
    return data;
  }
  async function signIn(email, password) {
    isLoading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      isLoading.value = false;
      return null;
    }
    setUser(data.user);
    isLoading.value = false;
    return data;
  }
  async function signOut() {
    isLoading.value = true;
    const { data, error } = await supabase.auth.signOut();
    if (error) console.log(error);
    setUser(null);
    isLoading.value = false;
  }

  return { user, setUser, fetchUser, signUp, signIn, signOut };
});
