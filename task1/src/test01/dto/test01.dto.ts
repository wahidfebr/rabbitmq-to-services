export interface ITest01 {
  id: number;
  nama: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITest01StoreDTO {
  nama: string;
  status: number;
}

export interface IPaginationOption {
  page: number;
  limit: number;
}
