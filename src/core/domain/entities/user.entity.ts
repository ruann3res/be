export type UserRole = 'ADMIN' | 'EMPLOYEE';
export interface UserVerifications { email: { verified: boolean; verifiedDate: string | null } }
export interface UserProps {
  id: string; email: string; fullName: string; address: string;
  phone: string | null; dateOfBirth: Date | null; roles: UserRole[];
  verifications: UserVerifications; externalId: string | null;
  documentPhotoUrl: string | null; photoUrl: string | null;
  createdAt: Date; updatedAt: Date;
}
export class User {
  private constructor(readonly props: UserProps) {}
  static reconstitute(props: UserProps): User { return new User(props); }
  static create(props: Omit<UserProps, 'createdAt' | 'updatedAt' | 'verifications'>): User {
    if (!props.email.includes('@')) throw new Error('Invalid email');
    return new User({ ...props, email: props.email.trim().toLowerCase(),
      verifications: { email: { verified: false, verifiedDate: null } },
      createdAt: new Date(), updatedAt: new Date() });
  }
  toObject(): UserProps { return { ...this.props }; }
}
