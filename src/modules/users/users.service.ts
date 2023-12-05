import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@users/dtos';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmailOrLogin(emailOrLogin: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.login = :value', { value: emailOrLogin })
      .orWhere('user.email = :value', { value: emailOrLogin })
      .getOne();
  }

  async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.findByEmailOrLogin(createUserDto.login);

    if (existUser) throw new BadRequestException('User does not exist');

    const user = this.userRepository.create(createUserDto);

    user.passwordHash = await argon2.hash(user.passwordHash);

    return this.userRepository.save(user);
  }

  update(id: number, updateUserDto: Partial<User>) {
    return this.userRepository.update(id, updateUserDto);
  }
}
