import { ApiProperty } from '@nestjs/swagger'
import { Todo } from 'src/todoes/todoes.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Уникальный идентификатор пользователя'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    example: 'admin',
    description: 'Уникальный логин пользователя'
  })
  @Column({ unique: true, nullable: false })
  login: string

  @ApiProperty({
    example: 'Vasya',
    description: 'Имя пользователя'
  })
  @Column({ nullable: false })
  name: string

  @ApiProperty({
    example: '1234qwerty',
    description: 'Пароль пользователя'
  })
  @Column({ nullable: false })
  password: string

  @ApiProperty({
    example: 'admin@admin.ru',
    description: 'Email пользователя'
  })
  @Column({ unique: true })
  email: string

  // @OneToMany(() => Todo, (todo) => todo.userId)
  // todo: Todo[]
}