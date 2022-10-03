import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from 'src/cards/card.model';
import { History } from 'src/history/history.model';
import { Room } from './room.model';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [SequelizeModule.forFeature([Room, History, Card])],
})
export class RoomsModule {}
