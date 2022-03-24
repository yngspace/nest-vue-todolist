import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto, GetUserDto, LoginUserDto } from './users.dto'
import { User } from './users.entity'
import * as bcrypt from 'bcrypt'
import { isUUIDValidate } from 'src/pipes/isUUID.pipe'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUser(req): Promise<GetUserDto|HttpException> {
    const { token } = req.headers
    
    isUUIDValidate(token)

    const response = await this.usersRepository.findOne({ where: { id: token } })
    if (!response) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        message: 'FORBIDDEN',
      }, HttpStatus.FORBIDDEN)
    }

    const user = new GetUserDto(response)
    return user
  }

  async login(body: LoginUserDto) {
    const { login, password } = body
    const user = await this.usersRepository.findOne({ where: { login } })

    if (!user) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        message: 'Пользователь не найден',
      }, HttpStatus.FORBIDDEN)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        message: 'FORBIDDEN',
        errors: { password: 'Не верный пароль' }
      }, HttpStatus.FORBIDDEN)
    }

    return {
      token: user.id
    }
  }

  async registration(body: CreateUserDto) {
    const { password, name, login, email } = body
    const checkLogin = await this.usersRepository.findOne({ where: { login } })
    const checkEmail = await this.usersRepository.findOne({where: { email } })

    if (checkEmail || checkLogin) {
      const errors: {[code: string]: string} = {}
      checkEmail ? errors.email = 'Почтовый адрес занят' : null
      checkLogin ? errors.login = 'Логин занят' : null
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'BAD_REQUEST',
        errors
      }, HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(password, 6)
    body.password = hashPassword
    body.name = name.slice(0, 1).toUpperCase() + name.slice(1, name.length).toLowerCase()
    const newUser = await this.usersRepository.save(body)
    return {
      token: newUser.id
    }
  }
}