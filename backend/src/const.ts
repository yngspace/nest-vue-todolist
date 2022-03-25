import { HttpStatus, UnauthorizedException } from '@nestjs/common'

const IS_EMPTY = 'Не может быть пустым'
const MIN_LENGTH = 'Минимальное количество символов: '
const MAX_LENGTH = 'Максимальное количество символов: '
const IS_EMAIL = 'Не корректный адресс электронной почты'

const thorwUnauthError = (): UnauthorizedException => {
  throw new UnauthorizedException({
    status: HttpStatus.FORBIDDEN,
    message: 'Невозможно войти с предоставленными данными',
  })
}

export {
  IS_EMPTY,
  MAX_LENGTH,
  MIN_LENGTH,
  IS_EMAIL,
  thorwUnauthError
}