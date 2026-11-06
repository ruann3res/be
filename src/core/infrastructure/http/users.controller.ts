import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { GetUserQuery, GetUserByEmailQuery, ListUsersQuery } from '../../application/queries/get-user.query';
import { CreateUserRequest } from './create-user.request';
@Controller('users')
export class UsersController {
  constructor(private readonly commands: CommandBus, private readonly queries: QueryBus) {}
  @Post() create(@Body() body: CreateUserRequest) { return this.commands.execute(new CreateUserCommand(body)); }
  @Get() list(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(20), ParseIntPipe) perPage: number) {
    return this.queries.execute(new ListUsersQuery(Math.max(1, page), Math.min(100, Math.max(1, perPage))));
  }
  @Get('by-email/:email') byEmail(@Param('email') email: string) { return this.queries.execute(new GetUserByEmailQuery(email)); }
  @Get(':id') byId(@Param('id', ParseUUIDPipe) id: string) { return this.queries.execute(new GetUserQuery(id)); }
}
