<template>
  <div>
    <NavBar />
    <div>
      <form class="add-form">
        <div class="input-container">
          <input
            v-model="amount"
            type="text"
            id="amount"
            class="styled_input_bar"
            placeholder=""
          />
          <label for="amount" class="input-label">Amount</label>
        </div>
        <div class="radio-group">
          <div class="radio">
            <input
              type="radio"
              name="type"
              value="0"
              id="deposit"
              v-model="typeOfTransaction"
            />
            <label for="deposit">Deposit</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              name="type"
              value="0"
              id="withdraw"
              v-model="typeOfTransaction"
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
          />
          <!-- <label for="date" class="input-label">Date</label> -->
        </div>

        <button class="submit-btn" type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "../NavBar/NavBar.vue";

const amount = ref();
const typeOfTransaction = ref("");
const date = ref();
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
</style>
