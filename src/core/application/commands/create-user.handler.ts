import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'node:crypto';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY, UserRepositoryPort } from '../ports/user-repository.port';
import { CreateUserCommand } from './create-user.command';
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject(USER_REPOSITORY) private readonly repository: UserRepositoryPort) {}
  async execute({ data }: CreateUserCommand) {
    const email = data.email.trim().toLowerCase();
    if (await this.repository.findByEmail(email)) throw new ConflictException('User already exists');
    const user = User.create({ id: randomUUID(), email, fullName: data.fullName,
      address: data.address, phone: data.phone ?? null,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      roles: data.roles, externalId: data.externalId ?? null,
      documentPhotoUrl: data.documentPhotoUrl ?? null, photoUrl: data.photoUrl ?? null });
    return (await this.repository.save(user)).toObject();
  }
}
