<template>
  <div class="main-filter">
    <div class="filter-container">
      <h1>Filter Transactions</h1>
      <div class="type-main">
        <h2>Type</h2>
        <div class="radio-group">
          <div class="radio">
            <input
              type="radio"
              name="type"
              value="deposit"
              id="deposit1"
              v-model="typeOfTransaction"
              required
              checked
            />
            <label for="deposit1">Deposit</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              name="type"
              value="withdraw"
              id="withdraw1"
              v-model="typeOfTransaction"
              required
            />
            <label for="withdraw1">Withdraw</label>
          </div>
        </div>
      </div>

      <h2>Category</h2>
      <div class="categories-main">
        <div class="category-group" v-if="typeOfTransaction === 'deposit'">
          <div
            v-for="(value, index) in depostiCategories"
            :key="index"
            class="radio"
          >
            <input
              type="radio"
              name="category"
              :value="value"
              :id="value.toLowerCase()"
              v-model="categoryOfTransaction"
            />
            <label :for="value.toLowerCase()">{{ value }}</label>
          </div>
        </div>
        <div class="category-group" v-else>
          <div
            v-for="(value, index) in withdrawCategories"
            :key="index"
            class="radio"
          >
            <input
              type="radio"
              name="category"
              :value="value"
              :id="value.toLowerCase()"
              v-model="categoryOfTransaction"
            />
            <label :for="value.toLowerCase()">{{ value }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-group">
      <button class="filter-btn" @click="handleFilter">Filter</button>
      <button class="close-btn" @click="emit('onClose')">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTrancStore } from "../../stores/transactions";

const emit = defineEmits(["onClose"]);

const withdrawCategories = [
  "Food",
  "Transport",
  "Housing",
  "Shopping",
  "Health",
  "Fun",
  "Education",
  "Other",
];

const depostiCategories = ["Salary", "Business", "Investment", "Gift", "Other"];

const typeOfTransaction = ref("deposit");
const categoryOfTransaction = ref("");
const trancStore = useTrancStore();

function handleFilter() {
  const filterOptions = {
    type: typeOfTransaction.value,
    category: categoryOfTransaction.value,
  };
  trancStore.filterTranc(filterOptions);
  emit("onClose");
}
</script>

<style scoped>
.main-filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  margin: 60px 0;
  height: 100%;
}
.filter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  padding-bottom: 130px;
}
.filter-container h1,
.filter-container h2 {
  border-bottom: 2px solid white;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
}

.filter-container h1 {
  font-size: 24px;
  font-weight: bold;
  border-bottom: 4px solid white;
  margin-bottom: 20px;
}

.filter-container h2 {
  font-size: 18px;
  font-weight: 600;
}
.type-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}
.categories-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.radio-group {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.radio {
  display: flex;
  gap: 5px;
  align-items: center;
}

.category-group {
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  flex-wrap: wrap;
  gap: 30px;
}

.btn-group {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 130px;
  padding: 20px;
}

.filter-btn {
  background-color: #fff;
  color: black;
  width: 50%;
  border-radius: 6px;
  padding: 6px;
}
.close-btn {
  width: 50%;
}
</style>
