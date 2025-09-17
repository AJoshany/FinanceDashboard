import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
const router = useRouter();

export const useTrancStore = defineStore("Tranc", {
  state: () => ({
    allTrancs: [],
    filteredTrancs: [],
    balance: 0,
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
        .order("date", { ascending: false });

      if (error) throw error;
      this.allTrancs = data;
      this.filteredTrancs = data;
      return data;
    },

    filterByTitle(title) {
      if (title === "") {
        this.filteredTrancs = this.allTrancs;
      }
      this.filteredTrancs = this.allTrancs.filter((tranc) => {
        return tranc.title.toLowerCase().startsWith(title.toLowerCase());
      });
    },
    filterTranc(option) {
      this.filteredTrancs = this.allTrancs.filter((tranc) => {
        if (option.category) {
          return (
            tranc.type === option.type && tranc.category === option.category
          );
        } else {
          return tranc.type === option.type;
        }
      });
    },
    async getBalance() {
      await this.getTrancs();

      if (!{ ...this.allTrancs }) {
        return {
          balance: 0,
          totalDeposits: 0,
          totalWithdraws: 0,
        };
      }
      const deposits = this.allTrancs.filter((tranc) => {
        return tranc.type === "deposit";
      });
      let depositAmounts = 0;
      if (deposits.length != 0) {
        depositAmounts = deposits
          .map((t) => Number(t.amount))
          .reduce((acc, curr) => acc + curr);
      }

      const withdraws = this.allTrancs.filter((tranc) => {
        return tranc.type === "withdraw";
      });

      let withdrawAmounts = 0;
      if (withdraws.length != 0) {
        withdrawAmounts = withdraws
          .map((t) => Number(t.amount))
          .reduce((acc, curr) => acc + curr);
      }

      const totalBallance = depositAmounts - withdrawAmounts;
      this.balance = totalBallance;
      return {
        balance: totalBallance,
        totalDeposits: depositAmounts,
        totalWithdraws: withdrawAmounts,
      };
    },

    getCategoriesCount() {
      const deposits = this.allTrancs.filter((tranc) => {
        return tranc.type === "deposit";
      });
      // const depositCategories = [
      //   ...new Set([...deposits.map((t) => t.category)]),
      // ];
      const depositCategories = deposits
        .map((t) => t.category)
        .reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {});

      const withdraws = this.allTrancs.filter((tranc) => {
        return tranc.type === "withdraw";
      });

      const withdrawCategories = withdraws
        .map((t) => t.category)
        .reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {});

      return { depositCategories, withdrawCategories };
    },

    getLastTrasactsion(count) {
      if(!{...this.allTrancs}){
        return false
      }
      return this.allTrancs.slice(0, count);
    },
  },
});
