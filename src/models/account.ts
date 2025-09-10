export type AccountType = 'LDAP' | 'Local';

export interface AccountLabel {
  text: string;
}

export interface Account {
  id: string;
  type: AccountType;
  login: string;
  password: string | null;
  labels: AccountLabel[];
}
