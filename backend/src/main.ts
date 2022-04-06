import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from './pipes/validation.pipe'

async function bootstrap() {
  const PORT = process.env.NESTPORT || 3000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Todo list app, pet-project')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('@laptevstas in telegram')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(PORT, () => {
    console.log({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    })
  })
}
bootstrap()
