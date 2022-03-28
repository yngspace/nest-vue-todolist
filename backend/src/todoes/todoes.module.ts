import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Folders } from 'src/folders/folders.entity'
import { FoldersService } from 'src/folders/folders.service'
import { TodoesController } from './todoes.controller'
import { Todo } from './todoes.entity'
import { TodoesService } from './todoes.service'

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Folders])],
  providers: [TodoesService, FoldersService],
  controllers: [TodoesController],
  exports: [TodoesService]
})
export class TodoesModule {}