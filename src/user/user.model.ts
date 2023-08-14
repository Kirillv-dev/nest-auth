import { Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id?: number;

  @Column
  firstName?: string;

  @Column
  lastName?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ unique: true })
  phone?: string;

  @Column
  password: string;

  @Column
  refreshToken: string;
}
