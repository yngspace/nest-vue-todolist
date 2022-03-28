import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/users.entity'
import { TodoesController } from './todoes.controller'
import { Todo } from './todoes.entity'
import { TodoesService } from './todoes.service'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoesService],
  controllers: [TodoesController],
  exports: [TodoesService]
})
export class TodoesModule {}