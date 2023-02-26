export interface IGetAll {
  totalPages: number;
  actualPage: number;
  nextPage?: any;
  prevPage?: any;
  data: IEmployee[];
}

export interface IEmployee {
  id_employee?: string;
  names: string;
  first_lastname: string;
  second_lastname: string;
  dni: string;
  phone_number: string;
  email: string;
  date_birth: string;
  state: boolean;
  role?: any;
}