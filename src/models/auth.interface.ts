export interface ILogin {
  username: string;
  password: string;
}

export interface IAuth {
  access_token: string;
}

export interface ICustomer{
  id_customer: string;
  names: string;
  first_lastname: string;
  second_lastname: string;
  dni: string;
  phone_number: string;
  email: string;
}
