import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("currentUser") || null),
  }),
  actions: {
    setUser(newUser) {
      this.user = newUser;
      if (newUser) {
        localStorage.setItem("currentUser", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("currentUser");
      }
    },
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      } else {
        this.setUser(data.user);
      }
    },
    async signUp(email, pass) {
      const { data, error } = await supabase.auth.signUp({ email, pass });
      if (error) {
        console.log(error);
      }
      this.setUser(data.user);
      return data;
    },
    async signIn(email, pass) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        pass,
      });
      if (error) console.log(error);
      this.setUser(data.user);
      return data;
    },
    async signOut(){
        const {data , error}= await supabase.auth.signOut()
        if(error) console.log(error);
        this.setUser(null)
    }
  },
});
