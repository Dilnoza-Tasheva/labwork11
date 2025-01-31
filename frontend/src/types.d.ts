export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  phone: number;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
  displayName: string;
  phone: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phone: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  image: string | null;
  price: number;
  category: string;
  seller: string;
}

export interface ItemMutation {
  title: string;
  description: string;
  image: string | null;
  price: number;
  category: string;
  seller: string;
}