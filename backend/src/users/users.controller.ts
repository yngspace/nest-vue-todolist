import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, LoginUserDto } from './users.dto'
import { UsersService } from './users.service'

class ResponseToken {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' })
  token: string
}

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: ResponseToken })
  @Post('/login')
  findUser(@Body() body: LoginUserDto) {
    return this.usersService.login(body)
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200 , type: ResponseToken})
  @Post('/reg')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.registration(body)
  }
}