import { UserRole } from '../../domain/entities/user.entity';
export class CreateUserCommand {
  constructor(public readonly data: { email: string; fullName: string; address: string;
    phone?: string; dateOfBirth?: string; roles: UserRole[];
    externalId?: string; documentPhotoUrl?: string; photoUrl?: string }) {}
}
