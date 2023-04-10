// export interface IGetEntrance {
//   id_entrance?: string;
//   description: string;
//   units: number;
//   unit_cost: number;
//   product: Product;
//   supplier: Supplier;
//   create_at?: string;
// }

export interface IEntrance {
  id_entrance?: string;
  description: string;
  units: number;
  unit_cost: string;
  id_purchase_detail?: string;
  total_price?: number;
  create_at?: string;
}

// export interface IEntrance {
//   id_entrance?: string;
//   description: string;
//   units: number;
//   unit_cost: number;
//   id_product: string;
//   id_supplier: string;
// }

// interface Supplier {
//   id_supplier: string;
//   name: string;
// }

// interface Product {
//   id_product: string;
//   name: string;
// }
