<template>
  <div>
    <NavBar />
    <div v-show="authStore.isLoading">
      <div class="loading-backdrop"></div>
      <div class="loading-container">Loading ....</div>
    </div>
    <div class="tranc-container">
      <!-- Add Transaction Form -->
      <div v-if="trancStore.showForm" class="form-container">
        <h1>Add Transaction</h1>
        <form
          class="add-form"
          @submit.prevent="handleSubmit"
          autocomplete="off"
        >
          <div class="input-container">
            <input
              v-model="title"
              type="text"
              id="title"
              class="styled_input_bar"
              placeholder=""
              required
            />
            <label for="title" class="input-label">Title</label>
          </div>
          <div class="input-container">
            <input
              v-model="amount"
              type="text"
              id="amount"
              class="styled_input_bar"
              placeholder=""
              required
            />
            <label for="amount" class="input-label">Amount</label>
          </div>
          <div class="radio-group">
            <div class="radio">
              <input
                type="radio"
                name="type"
                value="deposit"
                id="deposit"
                v-model="typeOfTransaction"
                required
                checked
              />
              <label for="deposit">Deposit</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                name="type"
                value="withdraw"
                id="withdraw"
                v-model="typeOfTransaction"
                required
              />
              <label for="withdraw">Withdraw</label>
            </div>
          </div>

          <div class="date-input-container">
            <label for="date" class="date-input-label">Date</label>
            <input
              v-model="date"
              type="date"
              id="date"
              class="date-input"
              required
            />
          </div>
          <select
            v-model="category"
            class="category"
            v-if="typeOfTransaction === 'withdraw'"
            required
          >
            <option disabled value="">Category</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Housing</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Fun</option>
            <option>Education</option>
            <option>Other</option>
          </select>
          <select v-model="category" class="category" v-else required>
            <option disabled value="">Category</option>
            <option>Salary</option>
            <option>Business</option>
            <option>Investment</option>
            <option>Gift</option>
            <option>Other</option>
          </select>
          <button class="submit-btn" type="submit">Add</button>
          <p v-if="success" class="text-green-500">Successfull</p>
          <p v-if="unSuccess" class="text-red-500">Unsuccessful</p>
        </form>
      </div>

      <!-- Transaction List -->
      <div v-else>
        <h1>Transactions List</h1>
        <div class="search-sec">
          <div class="input-container">
            <input
              type="text"
              placeholder=""
              id="search"
              class="styled_input_bar"
              v-model="titleSearch"
              @input="searchHandler"
            />
            <label for="search" class="input-label">Search</label>
          </div>

          <button @click="handleFilterShow">
            <i
              class="fa fa-filter"
              aria-hidden="true"
              style="font-size: 24px"
            ></i>
          </button>
        </div>

        <ul class="tranc-list">
          <li v-for="tranc in trancStore.filteredTrancs" :key="tranc.id">
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
        </ul>

        <button @click="resetFilters" class="resetBtn">Reset</button>
      </div>
      <button class="goToBtn" @click="handleShow">
        &lt;&lt;
        {{ trancStore.showForm ? "Go To List" : " Add Transaction" }}
      </button>
    </div>
    <FilterTranc
      class="filter-comp"
      v-if="showFilterComp"
      @onClose="handleFilterShow"
    />
    <div class="footer-line"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import NavBar from "../NavBar/NavBar.vue";
import { useTrancStore } from "../../stores/transactions";
import { useAuthStore } from "../../stores/auth";
import FilterTranc from "./FilterTranc.vue";

const authStore = useAuthStore();
const trancStore = useTrancStore();

const title = ref("");
const amount = ref();
const typeOfTransaction = ref("deposit");
const date = ref();
const category = ref("");
const success = ref(false);
const unSuccess = ref(false);
const titleSearch = ref("");
const showFilterComp = ref(false);

async function handleSubmit(event) {
  const data = await trancStore.addTranc({
    amount: amount.value,
    title: title.value,
    type: typeOfTransaction.value,
    date: date.value,
    category: category.value,
  });
  console.log(category.value);
  if (data) {
    success.value = true;
    unSuccess.value = false;
  } else {
    unSuccess.value = true;
    success.value = false;
  }
  event.target.reset();
  title.value = "";
  amount.value = "";
  typeOfTransaction.value = "";
  date.value = "";
  category.value = "";
  // success.value = false;
  // unSuccess.value = false;
}

function handleShow() {
  trancStore.showForm = !trancStore.showForm;
  success.value = false;
  unSuccess.value = false;
  trancStore.filteredTrancs = trancStore.allTrancs;
}

function resetFilters() {
  trancStore.filteredTrancs = trancStore.allTrancs;
}
onMounted(async () => {
  await trancStore.getTrancs();
});

function searchHandler() {
  trancStore.filterByTitle(titleSearch.value);
}

function handleFilterShow() {
  showFilterComp.value = !showFilterComp.value;
}
</script>

<style>
.add-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tranc-container h1 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

/* From Uiverse.io by chris_6688 */
/* Created by chris_6688 from uiverse.io */
.input-container {
  position: relative;
  width: 100%;
}
.styled_input_bar {
  width: 100%;
  padding: 1em;
  font-size: 1em;
  border: 0.1em solid grey;
  border-radius: 2em;
  background-color: transparent;
  color: white;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.styled_input_bar:focus {
  border-color: white;
}

.styled_input_bar:focus::placeholder {
  color: transparent;
}

.date-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.date-input {
  width: 100%;
  padding: 1em;
  font-size: 1em;
  border: 0.1em solid grey;
  border-radius: 2em;
}

.date-input-label {
  font-size: 1em;
  color: grey;
}
.input-label {
  position: absolute;
  left: 1em;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1em;
  color: grey;
  pointer-events: none;
  transition: all 0.3s ease;
}
.styled_input_bar:focus + .input-label,
.styled_input_bar:not(:placeholder-shown) + .input-label {
  top: 0.1em;
  left: 1em;
  font-size: 0.8em;
  color: white;
  background-color: #212121; /* IMPORTANT: Make sure you change this background color to the exact background color of your webpage or the background color of the container in which this input bar is contained. */
  padding: 0 0.5em;
}
.styled_input_bar:not(:focus):not(:placeholder-shown) + .input-label {
  color: grey;
}

.submit-btn {
  background-color: #43a047;
  border-radius: 2em;
  padding: 1em;
}

.radio-group {
  display: flex;
  justify-content: space-between;
}

.radio {
  display: flex;
  gap: 5px;
  align-items: center;
}

.goToBtn {
  position: fixed;
  left: 20px;
  bottom: 20px;
  color: #43a047;
  font-weight: 600;
  z-index: 101;
}

.resetBtn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  font-weight: 600;
  z-index: 101;
}

.category {
  background-color: #fff;
  padding: 1em;
  border-radius: 2em;
  color: black;
}

.search-sec {
  display: flex;
  gap: 10px;
}

.filter-comp {
  position: fixed;
  inset: 0;
  background-color: rgb(47, 47, 47);
}

.tranc-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 75px;
}
.tranc-item {
  box-sizing: content-box;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: rgb(62, 62, 62);
  border-radius: 6px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.trancTitle {
  padding-right: 10px;
  font-weight: 600;
}

.trancAmount {
  padding-right: 10px;
  font-weight: 600;
}

.trancCategory {
  font-size: 12px;
  opacity: 70%;
}

.trancDate {
  font-size: 12px;
  opacity: 70%;
}

.footer-line {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  border-top: 4px solid white;
  z-index: 100;
}
</style>
