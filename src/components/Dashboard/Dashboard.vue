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
          <div class="header__detail">
            <!-- <div class="detail__icon">
              <span
                ><i class="fa fa-long-arrow-up" aria-hidden="true"></i
              ></span>
            </div> -->
            <div class="detail__amout">{{ totalDeposits }} $</div>
          </div>
          <div class="header__detail">
            <!-- <div class="detail__icon">
              <span
                ><i class="fa fa-long-arrow-down" aria-hidden="true"></i
              ></span>
            </div> -->
            <div class="detail__amout">{{ totalWithdraws }} $</div>
          </div>
        </div>
      </div>
      <div v-if="balance">
        <div class="dash__charts">
          <CircleChart
            class="dash__chart deposit__chart"
            :datas="categories"
            type="deposit"
            v-if="categories && totalDeposits"
          />
          <CircleChart
            class="dash__chart"
            :datas="categories"
            type="withdraw"
            v-if="categories && totalWithdraws"
          />
        </div>
        <div class="dash__last-trancs">
          <h2>last transactions</h2>
          <div class="last-trancs__sec">
            <ul class="tranc-list">
              <li v-for="tranc in lastTrancs" :key="tranc.id">
                <div class="tranc-item">
                  <span class="trancTitle">{{ tranc.title }}</span>
                  <span
                    class="trancAmount"
                    :class="{
                      'text-green-500': tranc.type === 'deposit',
                      'text-red-500': tranc.type === 'withdraw',
                    }"
                    >{{ tranc.amount }}$</span
                  >
                  <span class="trancCategory">{{ tranc.category }}</span>
                  <span class="trancDate">{{
                    new Date(tranc.date)
                      .toISOString()
                      .split("T")[0]
                      .split("-")
                      .slice(1)
                      .join("/")
                  }}</span>
                </div>
              </li>
              <a @click="showMoreHandler" class="show-more-btn">show more</a>
            </ul>
          </div>
        </div>
      </div>
      <div class="empty-warning" v-else>
        <p>You have no transaction yet</p>
        <button @click="router.push('/transactions')">Add transaction</button>
      </div>
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

const allTrancs = ref();
const lastTrancs = ref();

const router = useRouter();

async function handleLogOut() {
  await authStore.signOut();
  router.push("/");
}

function showMoreHandler() {
  trancStore.showForm = false;
  router.push("/transactions");
}

watchEffect(async () => {
  const data = await trancStore.getBalance();
  allTrancs.value = trancStore.allTrancs.value;
  balance.value = data.balance;
  totalDeposits.value = data.totalDeposits;
  totalWithdraws.value = data.totalWithdraws;
  show.value = true;
  categories.value = trancStore.getCategoriesCount();
  lastTrancs.value = trancStore.getLastTrasactsion(3);
});
</script>

<style scoped>
.dash__header {
  display: flex;
  width: 300px;
  height: 300px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 5px solid white;
  padding: 30px 20px;
  border-radius: 50%;
  margin-top: 15px;
}
.header__details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
}
.header__detail {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid white;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  gap: 5px;
  font-weight: 600;
}

.header__detail:nth-child(1) {
  color: limegreen;
  border-color: limegreen;
}

.header__detail:nth-child(2) {
  color: rgb(235, 0, 0);
  border-color: rgb(223, 0, 0);
}

.header__balance {
  font-size: 40px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
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

.empty-warning {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
}

.empty-warning p {
  font-size: 18px;
  font-weight: 600;
}

.empty-warning button {
  background-color: #4caf50;
  padding: 10px 15px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.empty-warning button:hover {
  background-color: rgb(0, 128, 255);
}

.dash__last-trancs {
  text-align: center;
  margin-top: 20px;
}

.dash__last-trancs h2 {
  font-size: 20px;
  font-weight: 600;
}
.show-more-btn {
  text-align: right;
  font-size: 12px;
  padding-right: 5px;
  opacity: 60%;
}

.deposit__chart {
  margin-top: 10px;
  margin-bottom: -30px;
}
</style>
