import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/users.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Folders {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Уникальный идентификатор папки'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    example: 'Срочные',
    description: 'Название папки'
  })
  @Column()
  name: string

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Уникальный идентификатор пользователя'
  })
  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  user: string
}