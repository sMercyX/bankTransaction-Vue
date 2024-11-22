// stores/transactionStore.js
import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('account', {
  state: () => ({

    balance: 0,
    transactions: [],
  }),
  actions: {

    deposit(amount) {
      this.balance += amount;
      const date = new Date()
      this.transactions.push({ id: Date.now(),date: `${date.toDateString()} ${date.toLocaleTimeString()}`, type: 'deposit', amount });

    },
    withdraw(amount) {
      this.balance -= amount;
      const date = new Date()
      this.transactions.push({ id: Date.now(),date: `${date.toDateString()} ${date.toLocaleTimeString()}`, type: 'withdraw', amount });
    },
    editTransaction(id, newAmount) {
      const transaction = this.transactions.find((t) => t.id === id);
      if (transaction) {
        const diff = transaction.amount - newAmount;
        if (transaction.type === 'withdraw' && newAmount > (this.balance + transaction.amount)) {
          alert('You dont have enough balance');
          return;
        }
        this.balance += transaction.type === 'deposit' ? - diff : diff;
        transaction.amount = newAmount;
      }
    },
    deleteTransaction(id) {
      const transaction = this.transactions.find((t) => t.id === id);
      if (transaction) {
        this.balance += transaction.type === 'deposit' ? -transaction.amount : transaction.amount;
        this.transactions = this.transactions.filter((t) => t.id !== id);
      }
    },
  },
});
