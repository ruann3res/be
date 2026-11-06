import { Injectable } from '@nestjs/common';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { User, UserProps, UserRole, UserVerifications } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../application/ports/user-repository.port';
import { PrismaService } from './prisma.service';
@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}
  private map(record: PrismaUser): User {
    return User.reconstitute({ ...record, roles: record.roles as UserRole[],
      verifications: record.verifications as unknown as UserVerifications } as UserProps);
  }
  async save(user: User): Promise<User> {
    const p = user.toObject();
    const record = await this.prisma.user.create({ data: { id: p.id, email: p.email,
      fullName: p.fullName, address: p.address, phone: p.phone, dateOfBirth: p.dateOfBirth,
      externalId: p.externalId, roles: p.roles, documentPhotoUrl: p.documentPhotoUrl,
      photoUrl: p.photoUrl, verifications: p.verifications as unknown as Prisma.InputJsonValue } });
    return this.map(record);
  }
  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    return record ? this.map(record) : null;
  }
  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { email } });
    return record ? this.map(record) : null;
  }
  async findMany(page: number, perPage: number) {
    const [records, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({ skip: (page - 1) * perPage, take: perPage, orderBy: { createdAt: 'desc' } }),
      this.prisma.user.count(),
    ]);
    return { data: records.map(record => this.map(record)), total };
  }
}
