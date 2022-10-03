import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface RoomCreatinAttr {
  keyWithAccess: string[];
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreatinAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  number: number;
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    unique: false,
  })
  keyWithAccess: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    unique: false,
    defaultValue: [],
  })
  authorizedСards: string[];
}
