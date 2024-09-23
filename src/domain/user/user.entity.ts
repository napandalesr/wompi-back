import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({type: 'text', default: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()})
  created: string = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
}
