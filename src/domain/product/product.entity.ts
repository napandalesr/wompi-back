import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  count: number;

  @Column('decimal')
  price: number;

  @Column()
  shipping: string;

  @Column()
  description: string;
}
