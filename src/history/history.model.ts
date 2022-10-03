import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Room } from 'src/rooms/room.model';

interface HistoryCreatinAttr {
  dateOfAuthorization: string;
  roomNumber: number;
  authorizationKey: string;
}

@Table({ tableName: 'history' })
export class History extends Model<History, HistoryCreatinAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false })
  authorizationKey: string;

  @Column({ type: DataType.STRING, unique: false })
  dateOfAuthorization: string;

  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER })
  roomNumber: number;
}
