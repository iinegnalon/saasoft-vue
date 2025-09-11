<script lang="ts" setup>
import { useAccountsStore } from '@/stores/accounts.ts';
import { computed } from 'vue';
import AccountItem from '@/components/account/AccountItem.vue';

const accountsStore = useAccountsStore();

const accounts = computed(() => accountsStore.accounts);

function addAccount() {
  accountsStore.addAccount();
}
</script>

<template>
  <main class="accounts-page">
    <div class="accounts-page__header">
      <h4>Учетные записи</h4>

      <v-btn icon="mdi-plus" size="32" @click="addAccount"></v-btn>
    </div>

    <div class="accounts-page__hint">
      <v-icon icon="mdi-help-circle-outline" size="32"></v-icon>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </div>

    <div v-if="!accounts.length">
      Нажмите на +, чтобы добавить учетную запись
    </div>

    <div v-else class="accounts-list">
      <div class="accounts-list__header row">
        <div class="col col-labels">Метки</div>
        <div class="col col-type">Тип записи</div>
        <div class="col col-login">Логин</div>
        <div class="col col-pass">Пароль</div>
        <div class="col col-action" />
      </div>

      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.accounts-page {
  max-width: 1024px;
  padding: 24px 20px;
  margin: 0 auto;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    gap: 8px;
  }

  &__hint {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 8px;
    background: #ecf2f9;
    margin-bottom: 12px;
  }
}
</style>
