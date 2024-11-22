<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const errors = ref('');
  const router = useRouter();

  const accounts = [
    { email: 'titipong@gmail.com', password: '123',name:'titipong' },
    { email: 'test@gmail.com', password: '1',name:'testAccount' },
  ];
  
  const handleLogin = () => {
    const account = accounts.find(a => a.email === email.value && a.password === password.value);
    if (!account) {
      errors.value = 'Invalid email or password.';
      return;
    }
    
    localStorage.setItem('authentication', true);
    localStorage.setItem('user', account.name);
    router.push('/home');
  };
  </script>
  

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6 mx-3">
        <h1 class="text-2xl font-bold text-center text-gray-800">Login</h1>
        <form @submit.prevent="handleLogin" class="mt-6">
          <div class="mb-4">
            <p class=" text-gray-700 font-medium mb-2" >
              Email
            </p>
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="mb-6">
            <p class=" text-gray-700 font-medium mb-2">
              Password
            </p>
            <input
              type="password"
              v-model="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p v-if="errors" class="text-red-500 text-sm mt-1">{{ errors }}</p>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </template>
  
  