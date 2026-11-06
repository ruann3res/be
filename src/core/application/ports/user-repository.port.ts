import { User } from '../../domain/entities/user.entity';
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export interface UserRepositoryPort {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findMany(page: number, perPage: number): Promise<{ data: User[]; total: number }>;
}
