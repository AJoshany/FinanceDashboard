import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
const router = useRouter();

export const useTrancStore = defineStore("Tranc", {
  state: () => ({
    allTrancs: [],
  }),
  actions: {
    async addTranc(tranc) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.log("User not Loged in");
        router.push("/");
      }
      const { data, error } = await supabase.from("transactions").insert([
        {
          user_id: user.id,
          ...tranc,
        },
      ]);
      if (error) {
        console.log(error);
        return false;
      } else {
        await this.getTrancs();
        return true;
      }
    },
    async getTrancs() {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      this.allTrancs = data;
      return data;
    },
  },
});
