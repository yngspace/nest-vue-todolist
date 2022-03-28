import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/auth.guard'
import { CreateUserDto, GetUserDto, LoginUserDto } from './users.dto'
import { UsersService } from './users.service'

class ResponseToken {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' })
  token: string
}

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiHeader({ name: 'token', description: 'jwt token' })
  @ApiResponse({ status: 200, type: GetUserDto })
  @UseGuards(AuthGuard)
  @Get()
  findUser(@Req() req): Promise<GetUserDto|HttpException> {
    return this.usersService.findUser(req)
  }


  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: ResponseToken })
  @Post('/login')
  login(@Body() body: LoginUserDto): Promise<ResponseToken|HttpException> {
    return this.usersService.login(body)
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200 , type: ResponseToken})
  @Post('/reg')
  createUser(@Body() body: CreateUserDto): Promise<ResponseToken|HttpException> {
    return this.usersService.registration(body)
  }
}