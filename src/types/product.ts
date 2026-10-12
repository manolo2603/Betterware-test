import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.url(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

export const productsSchema = z.array(productSchema);

export const categoriesSchema = z.array(z.string());

export type Product = z.infer<typeof productSchema>;

export type CartItem = Product & { quantity: number };
