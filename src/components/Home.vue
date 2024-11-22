<script setup>
import Menu from "../sections/Menu.vue";
import NavBar from "./NavBar.vue";
import Transactions from "../sections/Transactions.vue";
</script>

<template>
  <div class="flex flex-col gap-3 ">
    <NavBar />
    <div class="flex flex-col gap-3 lg:gap-0 lg:grid lg:grid-cols-[1fr,2fr]">
      <Menu />
      <Transactions class="bg-white w-full h-full border rounded-lg lg:rounded-b-none"/>
    </div>
  </div>
</template>
