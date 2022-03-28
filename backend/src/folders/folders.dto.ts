import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { IS_EMPTY } from 'src/const'

export class CreatedFoldersDto {
  @ApiProperty({
    example: 'Срочные',
    description: 'Название папки'
  })
  @IsNotEmpty({ message: IS_EMPTY })
  name: string
}