import { DataTypes, Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

@Table
export class News extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id?: number;

  @Column
  title: string;

  @Column({ type: DataTypes.TEXT })
  content: string;
}
