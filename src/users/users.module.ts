import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { usersProviders } from './database/users.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from './database/users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UsersService, UsersRepository, ...usersProviders],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
