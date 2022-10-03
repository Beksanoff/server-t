import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoomCreateDto, RoomСomparison } from './dto/create-room.dto';
import { Room } from './room.model';
import { History } from 'src/history/history.model';
import { Card } from 'src/cards/card.model';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(History) private historyRepository: typeof History,
    @InjectModel(Card) private cardRepository: typeof Card,
  ) {}

  async createRoom(dto: RoomCreateDto) {
    const data = dto;
    if (data.keyWithAccess.length < 0 || !Array.isArray(data.keyWithAccess)) {
      throw new HttpException('Ключ доступа не указан', HttpStatus.BAD_REQUEST);
    }

    for (let i = 0; i < data.keyWithAccess.length; i++) {
      const result = await this.cardRepository.findOne({
        where: {
          key: data.keyWithAccess[i],
        },
      });
      if (!result) {
        await this.cardRepository.create({ key: data.keyWithAccess[i] });
      }
    }
    const room = this.roomRepository.create({ ...dto });
    return room;
  } // This method is only for filling the table by the developer

  async getInfo() {
    const result = await this.roomRepository.findAll();

    return {
      total: result.length,
    };
  }

  async getAllRoom(number: number) {
    const rooms = this.roomRepository.findOne({ where: { number } });
    return rooms;
  }

  async updateStatus(number) {
    const rooms = await this.cardRepository.findByPk(number);
    console.log(rooms);
  }

  async roomСomparison({ RoomCard, RoomNumber }: RoomСomparison) {
    const room = await this.roomRepository.findOne({
      where: { number: RoomNumber },
    });

    console.log(room);

    if (!room) {
      throw new HttpException(
        'Данная комната не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!room.keyWithAccess.includes(RoomCard)) {
      for (let i = 0; i < RoomCard.length; i++) {
        const result = await this.cardRepository.findOne({
          where: {
            key: RoomCard,
          },
        });
        if (result)
          throw new HttpException(
            'Данная карточки не от этой комнаты',
            HttpStatus.BAD_REQUEST,
          );
      }
      throw new HttpException('Ошибка валидации', HttpStatus.BAD_REQUEST);
    }

    if (!room.authorizedСards.includes(RoomCard)) {
      const roomAuth = await this.roomRepository.findByPk(RoomNumber);
      await this.updateStatus(RoomNumber);
    }
    await this.historyRepository.create({
      dateOfAuthorization: new Date().toISOString(),
      roomNumber: room.number,
      authorizationKey: RoomCard,
    });

    return this.historyRepository.findAll({
      where: {
        roomNumber: room.number,
      },
    });
  }
}
