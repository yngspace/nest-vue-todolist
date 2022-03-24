import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if (errors.length) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'BAD REQUEST',
        errors: this.buildError(errors)
      }, HttpStatus.BAD_REQUEST)
    }

    return value
  }

  private buildError(errors) {
    const result = {}

    errors.forEach(error => {
      const prop = error.property
      Object.entries(error.constraints).forEach(constraint => {
        result[prop] = constraint[1]
      })
    })

    return result
  }
}
