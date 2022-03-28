import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FoldersController } from './folders.controller'
import { Folders } from './folders.entity'
import { FoldersService } from './folders.service'

@Module({
  imports: [TypeOrmModule.forFeature([Folders])],
  providers: [FoldersService],
  controllers: [FoldersController],
  exports: []
})
export class FoldersModule {}