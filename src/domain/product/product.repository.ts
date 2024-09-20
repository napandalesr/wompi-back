import { Product } from "./product.entity";

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  find(): Promise<Product[]>;
}