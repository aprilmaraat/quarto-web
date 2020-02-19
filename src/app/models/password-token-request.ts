import { UserType } from './enum';

export class PasswordTokenRequest {
    EmailAddress: string;
    Password: string;
    UserType: UserType;
}