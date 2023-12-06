import { Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { AgenciesService } from './agencies.service';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Post()
  getAll() {}

  @Get(':id')
  getOne() {}

  @Put('create')
  create() {}

  @Patch(':id')
  update() {}
}
