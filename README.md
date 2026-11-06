# be-nest-users-cqrs-srv

Serviço **exclusivamente de usuários**, com CQRS + arquitetura hexagonal. O domínio de usuários é o core e **não existe `UsersModule`**: `AppModule` é somente a raiz de composição do NestJS.

## Incluído
- Criar usuário (command), consultar por ID/e-mail e listar com paginação (queries).
- Entidade independente do NestJS e Prisma.
- Porta `UserRepositoryPort` e adapter Prisma.
- PostgreSQL e schema Prisma restrito a `User`.
- HTTP controller com DTO e validação.

## Removido
Auth/Supabase, recuperação de senha, mailer, filas/Redis, storage, workers e demais módulos. **Não há autenticação ou armazenamento de senhas neste serviço.** O campo `externalId` é apenas referência opcional para um serviço de identidade externo.

## Iniciar
```bash
cp .env.example .env
pnpm install
pnpm exec prisma generate
docker compose up -d
pnpm exec prisma migrate dev --name init
pnpm start:dev
```

## Rotas
- `POST /users`
- `GET /users?page=1&perPage=20`
- `GET /users/:id`
- `GET /users/by-email/:email`

Exemplo de criação:
```json
{"email":"user@example.com","fullName":"Example User","address":"Street 1","roles":["EMPLOYEE"]}
```

**Nota:** código gerado para este recorte, sem execução de build/testes com dependências instaladas neste ambiente. A migração inicial deve ser criada via Prisma.
