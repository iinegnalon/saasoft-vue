<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { useAccountsStore } from '@/stores/accounts.ts';
import { onMounted } from 'vue';

const accountsStore = useAccountsStore();

onMounted(() => {
  initAccounts();
});

function initAccounts() {
  accountsStore.loadAccounts();
}
</script>

<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<style scoped></style>
