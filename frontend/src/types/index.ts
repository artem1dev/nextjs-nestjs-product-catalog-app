export type ProductCategory = "Clothing" | "Shoes" | "Electronics" | "Accessories" | "Other";

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: ProductCategory;
  price: number;
  availability: boolean;
  slug: string;
}