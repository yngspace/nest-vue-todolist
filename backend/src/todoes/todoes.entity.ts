import { ApiProperty } from '@nestjs/swagger'
import { Folders } from 'src/folders/folders.entity'
import { User } from 'src/users/users.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Todo {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Уникальный идентификатор todo'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    example: 'Сходить в магазин',
    description: 'Название todo'
  })
  @Column({ nullable: false })
  name: string

  @ApiProperty({
    example: 'Строка с описанием',
    description: 'Описание todo'
  })
  @Column({ nullable: false })
  description: string

  @ApiProperty({
    example: '2022-03-27 20:28:38.269',
    description: 'Дата создания todo, назначается автоматически'
  })
  @Column({ nullable: false, default: new Date() })
  createdAtt: Date

  @ApiProperty({
    example: '2022-03-27 20:28:38.269',
    description: 'Дата, крайний срок выполнения todo'
  })
  @Column()
  deadline: Date

  @ApiProperty({
    example: 'done',
    description: 'Строка, статус todo done|undone'
  })
  @Column({ nullable: false, default: 'undone' })
  status: 'done'|'undone'

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Уникальный идентификатор пользователя'
  })
  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  user: string

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Уникальный идентификатор папки'
  })
  @ManyToOne(() => Folders, folder => folder.id, { onDelete: 'CASCADE' })
  folder: string
}