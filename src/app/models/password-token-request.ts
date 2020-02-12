import { UserType } from './enum';

export class PasswordTokenRequest {
    UserName: string;
    Password: string;
    UserType: UserType;
}