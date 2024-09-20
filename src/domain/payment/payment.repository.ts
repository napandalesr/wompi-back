import { Payment } from "./payment.entity";

export interface PaymentRepository {
  create(payment: Payment): Promise<Payment>;
}