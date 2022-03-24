import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { IS_EMAIL, IS_EMPTY, MIN_LENGTH } from 'src/const'
import { User } from './users.entity'

export class CreateUserDto {
  @ApiProperty({
    example: 'admin@admin.ru',
    description: 'Email пользователя'
  })
  @IsEmail({}, { message: IS_EMAIL })
  email: string

  @ApiProperty({
    example: 'admin',
    description: 'Уникальный логин пользователя'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  @MinLength(4, { message: MIN_LENGTH + 4 })
  login: string

  @ApiProperty({
    example: '1234qwerty',
    description: 'Пароль пользователя'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  @MinLength(4, { message: MIN_LENGTH + 4})
  password: string

  @ApiProperty({
    example: 'Vasya',
    description: 'Имя пользователя'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  name: string
}

export class LoginUserDto {
  @ApiProperty({
    example: 'admin',
    description: 'Уникальный логин пользователя'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  @MinLength(4, { message: MIN_LENGTH + 4 })
  login: string

  @ApiProperty({
    example: '1234qwerty',
    description: 'Пароль пользователя'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  @MinLength(4, { message: MIN_LENGTH + 4})
  password: string
}

export class GetUserDto {
  constructor(user: User) {
    this.email = user.email
    this.login = user.login
    this.name = user.name
  }

  @ApiProperty({
    example: 'admin',
    description: 'Логин пользователя'
  })
  login: string

  @ApiProperty({
    example: 'Vasya',
    description: 'Имя пользователя'
  })
  name: string

  @ApiProperty({
    example: 'admin@admin.com',
    description: 'Email пользователя'
  })
  email: string
}