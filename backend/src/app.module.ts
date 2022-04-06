import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Folders } from './folders/folders.entity'
import { FoldersModule } from './folders/folders.module'
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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Todo, Folders],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    UsersModule,
    TodoesModule,
    FoldersModule
  ],
  exports: [JwtModule]
})
export class AppModule {}
