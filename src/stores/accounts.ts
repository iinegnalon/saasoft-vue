import { defineStore } from 'pinia';
import type { Account, AccountType } from '@/models/account';

interface AccountsStore {
  accounts: Account[];
}

const localStorageKey = 'accounts';

export const useAccountsStore = defineStore('accounts', {
  state: (): AccountsStore => ({
    accounts: [],
  }),

  actions: {
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        type: 'Local',
        login: '',
        password: '',
        labels: [],
      });

      this.saveAccounts();
    },

    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((a) => a.id !== id);

      this.saveAccounts();
    },

    setLabelsFromInput(id: string, text: string) {
      const account = this.accounts.find((a) => a.id === id);
      if (!account) {
        return;
      }

      account.labels = text
        .split(';')
        .map((l) => l.trim())
        .filter(Boolean) // Remove empty labels
        .map((val) => ({ text: val }));

      this.saveAccounts();
    },

    setType(id: string, value: AccountType) {
      const account = this.accounts.find((a) => a.id === id);
      if (!account) {
        return;
      }

      account.type = value;

      if (value === 'LDAP') {
        account.password = null;
      }

      if (value === 'Local' && !account.password) {
        account.password = '';
      }

      this.saveAccounts();
    },

    setLogin(id: string, value: string) {
      const account = this.accounts.find((a) => a.id === id);
      if (!account) {
        return;
      }

      account.login = value;

      this.saveAccounts();
    },

    setPassword(id: string, value: string) {
      const account = this.accounts.find((a) => a.id === id);
      if (!account || account.type !== 'Local') {
        return;
      }

      account.password = value;

      this.saveAccounts();
    },

    loadAccounts() {
      // Load accounts from local storage
      try {
        this.accounts = JSON.parse(
          localStorage.getItem(localStorageKey) || '[]',
        );
      } catch {
        this.accounts = [];
      }
    },

    saveAccounts() {
      // Save accounts to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(this.accounts));
    },
  },
});
