import { User } from './user.entity';
describe('User domain', () => {
  it('normalizes email and starts unverified', () => {
    const user = User.create({ id: 'id', email: 'TEST@EXAMPLE.COM', fullName: 'Test', address: 'Street',
      phone: null, dateOfBirth: null, roles: ['EMPLOYEE'], externalId: null, documentPhotoUrl: null, photoUrl: null });
    expect(user.toObject().email).toBe('test@example.com');
    expect(user.toObject().verifications.email.verified).toBe(false);
  });
});
