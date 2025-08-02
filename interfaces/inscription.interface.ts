export interface Inscription {
  id: number;
  userId: string;
  voucherId: number;
  createdAt: string;
  updatedAt: string;
  inscriptionType: string;
  state: string;
  cincitEdition: string;
  user: User;
  voucher: Voucher;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  dni: string;
  institution: string;
}

export interface Voucher {
  id: number;
  path: string;
}

export interface Meta {
  total: number;
  page: number;
  pageSize: number;
  lastPage: number;
}
