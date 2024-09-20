
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Payment } from '../payment/payment.entity';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  type: string;

  @Column()
  token: string;

  @OneToMany(() => Payment, (payment) => payment.payment_method)
  payment?: Payment[];
}