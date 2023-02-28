export interface IGetAll {
  totalPages: number;
  actualPage: number;
  nextPage?: any;
  prevPage?: any;
  data: IRole[];
}

export interface IRole {
  id_role: string;
  title: string;
}