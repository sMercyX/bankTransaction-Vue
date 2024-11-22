<script setup>
import { computed, ref } from "vue";
import { useTransactionStore } from "../store/transactionStore";
import { storeToRefs } from "pinia";

const transactionStore = useTransactionStore();
const { balance } = storeToRefs(transactionStore);
const transactionAmount = ref();

const withdrawHandle = () => {
  const amount = transactionAmount.value;

  transactionStore.withdraw(amount);
  transactionAmount.value = null;
};

const depositHandle = () => {
  const amount = transactionAmount.value;
  if (amount > 0) transactionStore.deposit(amount);
  transactionAmount.value = null;
};
</script>

<template>
  <div class="flex flex-col mx-auto w-5/6 text-xs lg:text-lg">
    <div
      class="w-full h-[70px] lg:h-[90px] mx-auto bg-white flex flex-col items-center justify-center rounded-lg"
    >
      <p class="font-bold">Current Balance</p>
      <p class="text-xl lg:text-2xl font-bold">$ {{ balance }}</p>
    </div>
    <div
      class="flex flex-col gap-3 lg:gap-4 mt-3 lg:mt-4 justify-center items-center"
    >
      <input
        type="number"
        v-model="transactionAmount"
        class="w-full py-2 px-3 rounded-lg border border-black"
        min="0"
        max="100000"
        placeholder="Enter amount (0-100000)"
      />
      <p
        v-if="transactionAmount > 100000 || transactionAmount < 0"
        class="text-red-500 text-sm "
      >
        please enter a number between 1 and 100000
      </p>
      <div class="flex gap-4 justify-center items-center w-full">
        <button
          class="py-2 w-full rounded-lg flex justify-center items-center bg-red-400 hover:scale-105 transition-all duration-300"
          :class="{
            '!bg-gray-300':
              transactionAmount > 100000 ||
              transactionAmount < 0 ||
              balance < transactionAmount,
          }"
          :disabled="
            transactionAmount > 100000 ||
            transactionAmount < 0 ||
            balance < transactionAmount
          "
          @click="withdrawHandle"
        >
          Withdraw
        </button>
        <button
          class="py-2 w-full rounded-lg flex justify-center items-center bg-green-400 hover:scale-105 transition-all duration-300"
          :class="{
            '!bg-gray-300': transactionAmount > 100000 || transactionAmount < 0,
          }"
          :disabled="transactionAmount > 100000 || transactionAmount < 0"
          @click="depositHandle"
        >
          Deposit
        </button>
      </div>
    </div>
  </div>
</template>
