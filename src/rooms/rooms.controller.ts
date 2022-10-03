import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomCreateDto, RoomСomparison } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  create(@Body() roomDto: RoomCreateDto) {
    return this.roomsService.createRoom(roomDto);
  }

  @Get('/total')
  getTotalRoom() {
    return this.roomsService.getInfo();
  }

  @Post('/room')
  getAll(@Body() roomСomparison: RoomСomparison) {
    const roomInfo = this.roomsService.roomСomparison({ ...roomСomparison });

    return roomInfo;
  }
}
