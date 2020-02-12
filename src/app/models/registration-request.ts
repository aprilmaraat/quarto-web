import { UserData } from './user-data';
import { PasswordTokenRequest } from './password-token-request';

export class RegistrationRequest {
    UserData: UserData;
    PasswordTokenRequest: PasswordTokenRequest;
}