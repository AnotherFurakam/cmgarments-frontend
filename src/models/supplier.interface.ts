export interface IGetAll {
  totalPages: number;
  actualPage: number;
  nextPage?: any;
  prevPage?: any;
  data: ISupplier[];
}

export interface ISupplier {
  id_supplier?: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  ruc: string;
  state: any;
}