<template>
  <div>
    <div v-show="authStore.isLoading || !show">
      <div class="loading-backdrop"></div>
      <div class="loading-container">Loading ....</div>
    </div>
    <NavBar />
    <div class="dashboard" v-if="show">
      <div class="dash__header">
        <div class="header__balance">
          <span>Balance</span>
          {{ balance }} $
        </div>
        <div class="header__details">
          <div class="header__detail text-green-400">
            <div class="detail__icon">
              <span
                ><i class="fa fa-long-arrow-up" aria-hidden="true"></i
              ></span>
            </div>
            <div class="detail__amout">{{ totalDeposits }} $</div>
          </div>
          <div class="header__detail text-red-400">
            <div class="detail__icon">
              <span
                ><i class="fa fa-long-arrow-down" aria-hidden="true"></i
              ></span>
            </div>
            <div class="detail__amout">{{ totalWithdraws }} $</div>
          </div>
        </div>
      </div>
      <div class="dash__chart">chart</div>
      <div class="dash__last-trancs">last transactions</div>
    </div>
    <div class="charts">
      <CircleChart :datas="categories" type="deposit" v-if="categories" />
      <CircleChart :datas="categories" type="withdraw" v-if="categories" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import NavBar from "../NavBar/NavBar.vue";
import { useTrancStore } from "../../stores/transactions";
import { onMounted, ref, watchEffect } from "vue";
import CircleChart from "./CircleChart.vue";

const balance = ref();
const totalDeposits = ref();
const totalWithdraws = ref();

const authStore = useAuthStore();
const trancStore = useTrancStore();
const show = ref(false);
const categories = ref();

const router = useRouter();

async function handleLogOut() {
  await authStore.signOut();
  router.push("/");
}

watchEffect(async () => {
  const data = await trancStore.getBalance();
  balance.value = data.balance;
  totalDeposits.value = data.totalDeposits;
  totalWithdraws.value = data.totalWithdraws;
  show.value = true;
  categories.value = trancStore.getCategoriesCount();
});
</script>

<style scoped>
.dash__header {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  border: 3px solid white;
  padding: 30px 20px;
  border-radius: 10px;
}
.header__details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}
.header__detail {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__balance {
  font-size: 34px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header__balance span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
.detail__amout {
  font-size: 18px;
}

.detail__icon {
  font-size: 16px;
}
</style>
