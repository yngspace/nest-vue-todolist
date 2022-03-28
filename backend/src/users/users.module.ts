import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from 'src/todoes/todoes.entity'
import { UsersController } from './users.controller'
import { User } from './users.entity'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
