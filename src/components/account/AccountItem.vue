<script lang="ts" setup>
import type { Account } from '@/models/account.ts';
import { useAccountsStore } from '@/stores/accounts.ts';
import { ref } from 'vue';

const props = defineProps<{ account: Account }>();

const accountsStore = useAccountsStore();

// Transform list of labels to string
const labelsString = ref(
  (props.account.labels || []).map((l) => l.text).join('; '),
);
const showPassword = ref(false);
</script>

<template>
  <div
    :class="{ 'row--grow': account.type === 'LDAP' }"
    class="accounts-list__row row"
  >
    <div class="col col-labels">
      <v-text-field
        v-model="labelsString"
        density="compact"
        placeholder="work; admin; root"
        variant="outlined"
        @blur="accountsStore.setLabelsFromInput(account.id, labelsString || '')"
      />
    </div>

    <div class="col col-type">
      <v-select
        :items="['Local', 'LDAP']"
        :model-value="account.type"
        density="compact"
        variant="outlined"
        @update:model-value="accountsStore.setType(account.id, $event)"
      />
    </div>

    <div class="col col-login">
      <v-text-field
        :model-value="account.login"
        density="compact"
        placeholder="user@example"
        variant="outlined"
        @blur="accountsStore.setLogin(account.id, $event.target.value)"
      />
    </div>

    <div v-if="account.type === 'Local'" class="col col-pass">
      <v-text-field
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :model-value="account.password"
        :type="showPassword ? 'text' : 'password'"
        density="compact"
        placeholder="••••••••"
        variant="outlined"
        @blur="accountsStore.setPassword(account.id, $event.target.value)"
        @click:append-inner="showPassword = !showPassword"
      />
    </div>

    <div class="col col-action">
      <v-btn
        icon="mdi-trash-can-outline"
        size="32"
        @click="accountsStore.deleteAccount(account.id)"
      >
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
