import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todoes/todoes.entity'
import { TodoesModule } from './todoes/todoes.module'
import { User } from './users/users.entity'
import { UsersModule } from './users/users.module'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Todo],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    UsersModule,
    TodoesModule
  ],
  exports: [JwtModule]
})
export class AppModule {}
