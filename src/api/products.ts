import { apiClient } from "./client";
import {
  categoriesSchema,
  productSchema,
  productsSchema,
  type Product,
} from "../types/product";

export async function getProducts(): Promise<Product[]> {
  const { data } = await apiClient.get("/products");
  return productsSchema.parse(data);
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await apiClient.get(`/products/${id}`);
  return productSchema.parse(data);
}

export async function getCategories(): Promise<string[]> {
  const { data } = await apiClient.get("/products/categories");
  return categoriesSchema.parse(data);
}
