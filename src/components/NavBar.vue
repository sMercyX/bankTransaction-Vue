<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import person from "../assets/person.svg";
import { useTransactionStore } from "../store/transactionStore";
import { storeToRefs } from "pinia";

const transactionStore = useTransactionStore();
const { user } = storeToRefs(transactionStore);
const router = useRouter();
const username = ref(user.value);

const handleLogout = () => {
  localStorage.removeItem("authentication");
  transactionStore.logout();
  router.push("/login");
};
</script>

<template>
  <div >
    <div class="flex justify-between mx-3 my-3 text-white">
      <div class="flex gap-2">
        <img :src="person" class="w-8" alt="Profile" />
        <h1 class="flex items-center">{{ username }}</h1>
      </div>
      <h1
        @click="handleLogout"
        class="flex items-center hover:underline transition-all duration-300 cursor-pointer"
      >
        Logout
      </h1>
    </div>
  </div>
</template>
