import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './core/application/commands/create-user.handler';
import { GetUserHandler, GetUserByEmailHandler, ListUsersHandler } from './core/application/queries/get-user.handlers';
import { USER_REPOSITORY } from './core/application/ports/user-repository.port';
import { UsersController } from './core/infrastructure/http/users.controller';
import { PrismaService } from './core/infrastructure/persistence/prisma.service';
import { PrismaUserRepository } from './core/infrastructure/persistence/prisma-user.repository';
@Module({ imports: [CqrsModule], controllers: [UsersController],
  providers: [PrismaService, { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    CreateUserHandler, GetUserHandler, GetUserByEmailHandler, ListUsersHandler] })
export class AppModule {}
