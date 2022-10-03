import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CardCreatinAttr {
  key: string;
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, CardCreatinAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  key: string;
}
