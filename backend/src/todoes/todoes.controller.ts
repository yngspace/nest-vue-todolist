import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/auth.guard'
import { CreatedTodoesDto, TodoesWithPagination, UpdateTodoDto } from './todoes.dto'
import { Todo } from './todoes.entity'
import { TodoesService } from './todoes.service'

@ApiTags('todoes')
@Controller('/api/todoes')
export class TodoesController {
  constructor(private todoesService: TodoesService) {}

  @ApiOperation({ summary: 'Получение списка todo с пагинацией' })
  @ApiHeader({ name: 'token', description: 'jwt token' })
  @ApiResponse({ status: 200, type: TodoesWithPagination })
  @UseGuards(AuthGuard)
  @Get()
  getTodoes(@Req() req, @Query() q) {
    return this.todoesService.findTodoes(req, q)
  }

  @ApiOperation({ summary: 'Создание todo' })
  @ApiHeader({ name: 'token', description: 'jwt token' })
  @ApiResponse({ status: 200, type: Todo })
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req, @Body() body: CreatedTodoesDto) {
    return this.todoesService.create(req, body)
  }

  @ApiOperation({ summary: 'Редактировать todo' })
  @ApiHeader({ name: 'token', description: 'jwt token' })
  @ApiResponse({ status: 200, type: Todo })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Body() body: UpdateTodoDto, @Param() param) {
    return this.todoesService.update(body, param.id)
  }

  @ApiOperation({ summary: 'Редактировать todo' })
  @ApiHeader({ name: 'token', description: 'jwt token' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param() param) {
    return this.todoesService.delete(param.id)
  }
}