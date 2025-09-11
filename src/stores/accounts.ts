import { defineStore } from 'pinia';
import type { Account, AccountType } from '@/models/account';

export type AccountField = 'labels' | 'type' | 'login' | 'password';
export type AccountFieldErrors = Record<string, Record<AccountField, string>>;

interface AccountsStore {
  accounts: Account[];
  accountErrors: AccountFieldErrors;
}

const localStorageKey = 'accounts';

export const useAccountsStore = defineStore('accounts', {
  state: (): AccountsStore => ({
    accounts: [],
    accountErrors: {},
  }),

  getters: {
    getAccountById: (s) => (id: string) => s.accounts.find((a) => a.id === id),
  },

  actions: {
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        type: 'Локальная',
        login: '',
        password: '',
        labels: [],
      });

      this._saveAccounts();
    },

    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((a) => a.id !== id);

      this._saveAccounts();
    },

    setLabelsFromInput(id: string, text: string) {
      const account = this.getAccountById(id);
      if (!account) {
        return;
      }

      let labelsList = text
        .split(';')
        .map((l) => l.trim())
        .filter(Boolean) // Remove empty labels
        .map((val) => ({ text: val }));

      let labelsStringTrimmed = labelsList.map((l) => l.text).join(';');

      if (labelsStringTrimmed.length > 50) {
        this._error(id, 'labels', 'Максимум 50 символов');
        return;
      }

      account.labels = labelsList;
      this._clearError(id, 'labels');

      this._saveAccounts();
    },

    setType(id: string, value: AccountType) {
      const account = this.getAccountById(id);
      if (!account) {
        return;
      }

      if (value !== 'LDAP' && value !== 'Локальная') {
        this._error(id, 'type', 'Неверный тип учетной записи');
        return;
      }

      account.type = value;
      this._clearError(id, 'type');

      if (value === 'LDAP') {
        account.password = null;
      }

      if (value === 'Локальная' && !account.password) {
        account.password = '';
      }

      this._saveAccounts();
    },

    setLogin(id: string, value: string) {
      const account = this.getAccountById(id);
      if (!account) {
        return;
      }

      if (!value) {
        this._error(id, 'login', 'Обязательное поле');
        return;
      }

      if (value.length > 100) {
        this._error(id, 'login', 'Максимум 100 символов');
        return;
      }

      account.login = value;
      this._clearError(id, 'login');

      this._saveAccounts();
    },

    setPassword(id: string, value: string) {
      const account = this.getAccountById(id);
      if (!account || account.type !== 'Локальная') {
        return;
      }

      if (!value) {
        this._error(id, 'password', 'Обязательное поле');
        return;
      }

      if (value.length > 100) {
        this._error(id, 'password', 'Максимум 100 символов');
        return;
      }

      account.password = value;
      this._clearError(id, 'password');

      this._saveAccounts();
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

    _saveAccounts() {
      // Save accounts to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(this.accounts));
    },

    _error(id: string, field: AccountField, msg: string) {
      if (!this.accountErrors[id]) {
        this.accountErrors[id] = {
          labels: '',
          type: '',
          login: '',
          password: '',
        };
      }

      this.accountErrors[id][field] = msg;
    },

    _clearError(id: string, field: AccountField) {
      this._error(id, field, '');
    },
  },
});
