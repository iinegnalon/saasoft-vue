<script lang="ts" setup>
import { useAccountsStore } from '@/stores/accounts.ts';
import { computed } from 'vue';

const accountsStore = useAccountsStore();

const accounts = computed(() => accountsStore.accounts);
</script>

<template>
  <main class="home-page">
    <div>
      <v-btn flat icon="mdi-plus" @click="accountsStore.addAccount()"></v-btn>

      <div v-for="account in accounts" :key="account.id">
        <div>{{ account.id }}</div>
        <div>{{ account.labels }}</div>
        <div>{{ account.type }}</div>
        <v-text-field
          :model-value="account.login"
          label="Login"
          variant="outlined"
          @blur="accountsStore.setLogin(account.id, $event.target.value)"
        />
        <v-text-field
          :model-value="account.password"
          label="Password"
          type="password"
          variant="outlined"
          @blur="accountsStore.setPassword(account.id, $event.target.value)"
        />
        <v-btn
          flat
          icon="mdi-trash-can"
          @click="accountsStore.deleteAccount(account.id)"
        ></v-btn>
        <div>--------------</div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
