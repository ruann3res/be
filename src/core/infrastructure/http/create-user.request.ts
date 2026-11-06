import { IsArray, IsEmail, IsEnum, IsISO8601, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { UserRole } from '../../domain/entities/user.entity';
export class CreateUserRequest {
  @IsEmail() email!: string;
  @IsString() @MinLength(2) fullName!: string;
  @IsString() address!: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsISO8601() dateOfBirth?: string;
  @IsArray() @IsEnum(['ADMIN','EMPLOYEE'], { each: true }) roles!: UserRole[];
  @IsOptional() @IsString() externalId?: string;
  @IsOptional() @IsString() documentPhotoUrl?: string;
  @IsOptional() @IsString() photoUrl?: string;
}
