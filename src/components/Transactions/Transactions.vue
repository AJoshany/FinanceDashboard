<template>
  <div>
    <NavBar />
    <div>
      <form class="add-form" @submit.prevent="handleSubmit" v-if="showForm">
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

        <div class="input-container">
          <input
            v-model="date"
            type="date"
            id="date"
            class="styled_input_bar"
            placeholder=""
            required
          />
          <!-- <label for="date" class="input-label">Date</label> -->
        </div>
        <select
          v-model="category"
          class="category"
          v-if="typeOfTransaction === 'withdraw'"
          required
        >
          <option disabled value="">Please select one</option>
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
          <option disabled value="">Please select one</option>
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
      <ul v-else>
        <li v-for="tranc in allTrancs" :key="tranc.id">
          {{ tranc.title }} -- {{ tranc.amount }} --
          {{ new Date(tranc.date).toISOString().split("T")[0] }}--
          {{ tranc.category }}
        </li>
      </ul>
      <button class="goToBtn" @click="handleShow">
        &lt;&lt;
        {{ showForm ? "Go To List" : " Add Transaction" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import NavBar from "../NavBar/NavBar.vue";
import { useTrancStore } from "../../stores/transactions";

const title = ref("");
const amount = ref();
const typeOfTransaction = ref("deposit");
const date = ref();
const category = ref("");
const success = ref(false);
const unSuccess = ref(false);

const showForm = ref(true);

const trancStore = useTrancStore();
const allTrancs = ref();

async function handleSubmit(event) {
  const data = await trancStore.addTranc({
    amount: amount.value,
    title: title.value,
    type: typeOfTransaction.value,
    date: date.value,
    category: category.value,
  });
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
  // success.value = false;
  // unSuccess.value = false;
}

function handleShow() {
  showForm.value = !showForm.value;
}
onMounted(async () => {
  allTrancs.value = await trancStore.getTrancs();
});
</script>

<style scoped>
.add-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
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
.styled_input_bar::placeholder {
  color: grey;
  transition: all 0.3s ease;
}
.styled_input_bar:focus {
  border-color: white;
}
.styled_input_bar:focus::placeholder {
  color: transparent;
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
}

.category {
  background-color: #fff;
  padding: 1em;
  border-radius: 2em;
  color: black;
}
</style>
