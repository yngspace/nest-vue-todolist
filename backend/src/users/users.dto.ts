import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { IS_EMAIL, IS_EMPTY, MIN_LENGTH } from 'src/const'

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