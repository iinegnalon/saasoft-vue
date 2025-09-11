<script lang="ts" setup>
import type { Account } from '@/models/account.ts';
import { useAccountsStore } from '@/stores/accounts.ts';
import { computed, ref, watch } from 'vue';

const props = defineProps<{ account: Account }>();

const accountsStore = useAccountsStore();

// Transform list of labels to string
const labelsString = ref(
  (props.account.labels || []).map((l) => l.text).join(';'),
);
const showPassword = ref(false);

const accountErrors = computed(() => accountsStore.accountErrors);

// Update labels to trimmed string
watch(
  () => props.account.labels,
  () => {
    labelsString.value = (props.account.labels || [])
      .map((l) => l.text)
      .join(';');
  },
);
</script>

<template>
  <div
    :class="{ 'row--grow': account.type === 'LDAP' }"
    class="accounts-list__row row"
  >
    <div class="col col-labels">
      <v-text-field
        v-model="labelsString"
        :error-messages="accountErrors[account.id]?.labels"
        density="compact"
        placeholder="work; admin; root"
        variant="outlined"
        @blur="accountsStore.setLabelsFromInput(account.id, labelsString || '')"
      />
    </div>

    <div class="col col-type">
      <v-select
        :error-messages="accountErrors[account.id]?.type"
        :items="['Локальная', 'LDAP']"
        :model-value="account.type"
        density="compact"
        variant="outlined"
        @update:model-value="accountsStore.setType(account.id, $event)"
      />
    </div>

    <div class="col col-login">
      <v-text-field
        :error-messages="accountErrors[account.id]?.login"
        :model-value="account.login"
        density="compact"
        placeholder="user@example"
        variant="outlined"
        @blur="accountsStore.setLogin(account.id, $event.target.value)"
      />
    </div>

    <div v-if="account.type === 'Локальная'" class="col col-pass">
      <v-text-field
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :error-messages="accountErrors[account.id]?.password"
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
