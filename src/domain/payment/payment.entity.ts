import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PaymentMethod } from '../paymentMethod/paymentMethod.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  amount_in_cents: number;

  @Column()
  currency: string;

  @Column()
  customer_email: string;

  @Column({
    default: 'pending'
  })
  status?: string = 'pending';

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.payment, {
    eager: true,
  })
  payment_method?: PaymentMethod;

  @Column()
  reference: string;
}
