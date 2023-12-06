import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '@users/services';
import { CreateUserDto, FiltersUserDto } from '@users/dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async getAllUsers(@Body() filtersUser: FiltersUserDto) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
