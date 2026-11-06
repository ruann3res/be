export class GetUserQuery { constructor(public readonly id: string) {} }
export class GetUserByEmailQuery { constructor(public readonly email: string) {} }
export class ListUsersQuery { constructor(public readonly page = 1, public readonly perPage = 20) {} }
