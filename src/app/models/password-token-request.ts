import { UserType } from './enum';

export class PasswordTokenRequest {
    Password: string;
    UserType: UserType;
}