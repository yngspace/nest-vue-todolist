import { HttpException, HttpStatus } from '@nestjs/common'

export const isUUIDValidate = (value: string) => {
   if (value.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
     return
   } else {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      message: 'FORBIDDEN',
    }, HttpStatus.FORBIDDEN)
   }

}