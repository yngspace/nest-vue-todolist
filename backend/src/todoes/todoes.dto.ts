import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsDateString, IsEmpty, IsEnum, IsIn, IsNotEmpty, IsUUID } from 'class-validator'
import { IS_EMPTY } from 'src/const'
import { Todo } from './todoes.entity'

export class CreatedTodoesDto {
  @ApiProperty({
    example: 'Сходить в магазин',
    description: 'Название todo'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  name: string

  @ApiProperty({
    example: 'Строка с описанием',
    description: 'Описание todo'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  description: string

  @ApiProperty({
    example: '2022-03-27 20:28:38.269',
    description: 'Дата, крайний срок выполнения todo'
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: IS_EMPTY })
  deadline: Date
}

export class TodoesWithPagination {
  @ApiProperty({
    example: true,
    description: 'Есть следующая страница или нет'
  })
  next: boolean = true
  @ApiProperty({
    example: false,
    description: 'Есть предидущая страница или нет'
  })
  prev: boolean = false
  @ApiProperty({
    example: 20,
    description: 'Количество найденых записей'
  })
  count: number = 20
  @ApiProperty({
    example: [],
    description: 'Результат'
  })
  result: [Todo]
}

enum Status {
  done = 'done',
  undone = 'undone'
}

export class UpdateTodoDto {
  @ApiProperty({
    example: 'Сходить в магазин',
    description: 'Название todo'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  name: string

  @ApiProperty({
    example: 'Строка с описанием',
    description: 'Описание todo'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  description: string

  @ApiProperty({
    example: '2022-03-27 20:28:38.269',
    description: 'Дата, крайний срок выполнения todo'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  @IsDate()
  @Type(() => Date)
  deadline: Date

  @ApiProperty({
    example: 'done',
    description: 'Статус todo'
  })
  @IsEnum(Status, { message: 'Недопустимое значение' })
  status: Status

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Уникальный идентификатор папки'
  })
  folder: string
}