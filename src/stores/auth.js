import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("currentUser") || null));

  function setUser(newUser) {
    user.value = newUser;
    if (newUser) {
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  async function fetchUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
    } else {
      setUser(data.user);
    }
  }
  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log(error);
      return null;
    }
    setUser(data.user);
    return data;
  }
  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      return null;
    }
    setUser(data.user);
    return data;
  }
  async function signOut() {
    const { data, error } = await supabase.auth.signOut();
    if (error) console.log(error);
    setUser(null);
  }

  return { user, setUser, fetchUser, signUp, signIn, signOut };
});
