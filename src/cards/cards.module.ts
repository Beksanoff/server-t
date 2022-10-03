import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from 'src/rooms/room.model';
import { History } from 'src/history/history.model';
import { CardsService } from './cards.service';
import { Card } from './card.model';

@Module({
  providers: [CardsService],
  controllers: [],
  imports: [SequelizeModule.forFeature([Room, History, Card])],
})
export class CardsModule {}
