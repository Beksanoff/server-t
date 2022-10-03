import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from 'src/rooms/room.model';
import { History } from './history.model';

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
  imports: [SequelizeModule.forFeature([Room, History])],
})
export class HistoryModule {}
