import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { USER_REPOSITORY, UserRepositoryPort } from '../ports/user-repository.port';
import { GetUserQuery, GetUserByEmailQuery, ListUsersQuery } from './get-user.query';
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject(USER_REPOSITORY) private readonly repository: UserRepositoryPort) {}
  async execute(query: GetUserQuery) {
    const user = await this.repository.findById(query.id);
    if (!user) throw new NotFoundException('User not found');
    return user.toObject();
  }
}
@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(@Inject(USER_REPOSITORY) private readonly repository: UserRepositoryPort) {}
  async execute(query: GetUserByEmailQuery) {
    const user = await this.repository.findByEmail(query.email.toLowerCase());
    if (!user) throw new NotFoundException('User not found');
    return user.toObject();
  }
}
@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(@Inject(USER_REPOSITORY) private readonly repository: UserRepositoryPort) {}
  async execute(query: ListUsersQuery) {
    const { data, total } = await this.repository.findMany(query.page, query.perPage);
    return { data: data.map(user => user.toObject()), total, page: query.page, perPage: query.perPage };
  }
}
