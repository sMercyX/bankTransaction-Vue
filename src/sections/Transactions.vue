<script setup>
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useTransactionStore } from "../store/transactionStore";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";

const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);
const reversedTransactions = computed(() => [...transactions.value].reverse());
const showEditModal = ref(false);
const showDeleteModal = ref(false);

const editTransactionId = ref(null);
const editAmount = ref(null);

const deleteTransactionId = ref(null);

const editTransaction = (transaction) => {
  editTransactionId.value = transaction.id;
  editAmount.value = transaction.amount;
  showEditModal.value = true;
};

const confirmEdit = () => {
  transactionStore.editTransaction(editTransactionId.value, editAmount.value);
  showEditModal.value = false;
};

const cancelEdit = () => {
  showEditModal.value = false;
};

const deleteTransaction = (id) => {
  deleteTransactionId.value = id;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  transactionStore.deleteTransaction(deleteTransactionId.value);
  showDeleteModal.value = false;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
};
</script>

<template>
  <div
    class="mx-auto w-[90%] h-[70vh] lg:h-[90vh] pt-2 overflow-y-auto text-xs lg:text-lg"
  >
    <h2
      class="text-xl lg:text-2xl font-bold mb-4 flex items-center justify-center"
    >
      Transaction History
    </h2>
    <div class="">
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2">Date</th>
            <th class="border border-gray-300 px-4 py-2">Type</th>
            <th class="border border-gray-300 px-4 py-2">Amount</th>
            <th class="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in reversedTransactions"
            :key="transaction.id"
            class="hover:bg-gray-100 overflow-y-auto text-center"
          >
            <td class="border border-gray-300">
              {{ transaction.date }}
            </td>
            <td
              class="border border-gray-300"
              :class="
                transaction.type === 'deposit'
                  ? 'text-green-500'
                  : 'text-red-500'
              "
            >
              {{ transaction.type }}
            </td>
            <td class="border border-gray-300">$ {{ transaction.amount }}</td>
            <td
              class="border-t py-2 flex items-center justify-center gap-2 lg:gap-5"
            >
              <img
                :src="editIcon"
                alt="Edit"
                class="h-3 lg:h-5 cursor-pointer hover:scale-110 transition-all duration-300"
                @click="editTransaction(transaction)"
              />
              <img
                :src="deleteIcon"
                alt="Delete"
                class="h-4 lg:h-6 cursor-pointer hover:scale-110 transition-all duration-300"
                @click="deleteTransaction(transaction.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="showEditModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-6 w-96 mx-5">
        <h3 class="text-lg font-bold mb-4">Edit Transaction</h3>
        <h1 class="block text-sm font-medium mb-2">Amount</h1>
        <input
          id="editAmount"
          type="number"
          v-model="editAmount"
          class="w-full px-4 py-2 border rounded-lg mb-4"
          :min="1"
          :max="100000"
        />
        <div class="flex justify-end">
          <button
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            @click="cancelEdit"
          >
            Cancel
          </button>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            :class="{
              'bg-gray-300': editAmount > 100000 || editAmount < 1,
            }"
            :disabled="editAmount > 100000 || editAmount < 0"
            @click="confirmEdit"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-6 w-96 mx-5">
        <h3 class="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p class="mb-4">Are you sure you want to delete this transaction?</p>
        <div class="flex justify-end">
          <button
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            @click="cancelDelete"
          >
            Cancel
          </button>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            @click="confirmDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
