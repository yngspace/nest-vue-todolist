import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsIn, IsNotEmpty } from 'class-validator'
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
    example: '24.09.2022',
    description: 'Дата, крайний срок выполнения todo'
  })
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
    example: '24.09.2022',
    description: 'Дата, крайний срок выполнения todo'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  deadline: Date

  @ApiProperty({
    example: 'done',
    description: 'Статус todo'
  })
  @IsEnum(Status, { message: 'Недопустимое значение' })
  status: Status
}