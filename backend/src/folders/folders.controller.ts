import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/auth.guard'
import { CreatedFoldersDto } from './folders.dto'
import { Folders } from './folders.entity'
import { FoldersService } from './folders.service'

@ApiTags('Folders')
@Controller('api/folders')
export class FoldersController {
  constructor(private folderService: FoldersService) {}

  @ApiOperation({ summary: 'Получение папок' })
  @ApiHeader({ name: 'token', description: 'jwt token' })
  @ApiResponse({ status: 200, type: [Folders] })
  @UseGuards(AuthGuard)
  @Get()
  getFolders(@Req() req) {
    return this.folderService.getFolders(req)
  }

  @ApiOperation({ summary: 'Создание папки' })
  @ApiHeader({ name: 'token', description: 'jwt token' })
  @ApiResponse({ status: 200, type: Folders })
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req, @Body() body: CreatedFoldersDto) {
    return this.folderService.create(req, body)
  }

  @ApiOperation({ summary: 'Удаление папки' })
  @ApiHeader({ name: 'token', description: 'jwt token' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param() param) {
    return this.folderService.delete(param.id)
  }
}