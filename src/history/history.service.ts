import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHistoryDto } from './dto/create-history.dto';
import { History } from './history.model';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History) private historyRepository: typeof History,
  ) {}

  async create(dto: CreateHistoryDto) {
    const log = await this.historyRepository.create({ ...dto });
    return log;
  }
}
