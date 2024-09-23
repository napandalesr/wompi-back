import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  count: number;

  @Column('decimal')
  price: number;

  @Column('decimal', {
    nullable: true
  })
  oldPrice?: number;

  @Column()
  shipping: string;

  @Column({
    nullable: true
  })
  status?: string;

  @Column()
  description: string;

  @Column({
    nullable: true
  })
  images?: string;
}
