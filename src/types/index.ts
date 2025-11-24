export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  brand: string;
  category: string;
  store: string;
  image: string;
}

export interface Coupon {
  id: number;
  title: string;
  code: string;
  store: string;
  expiry: string;
  type: "Code" | "Automatic";
  discount: string;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
}

export interface Brand {
  slug: string;
  name: string;
  logo: string;
}

export interface Store {
  slug: string;
  name: string;
  logo: string;
}
