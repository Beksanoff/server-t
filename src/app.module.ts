import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './rooms/room.model';
import { RoomsModule } from './rooms/rooms.module';
import { HistoryModule } from './history/history.module';
import { History } from './history/history.model';
import { CardsService } from './cards/cards.service';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Room, History],
      autoLoadModels: true,
    }),
    RoomsModule,
    HistoryModule,
    CardsModule,
  ],
  providers: [CardsService],
})
export class AppModule {}
