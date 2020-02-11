import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { PasswordTokenRequest } from '../../models/password-token-request';
import { RegistrationRequest } from '../../models/registration-request';

@Component({
  selector: 'q-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registrationRequest = new RegistrationRequest;
  public userData = new UserData;
  public passwordTokenRequest = new PasswordTokenRequest;

  constructor() {
    this.registrationRequest.UserData = new UserData;
    this.registrationRequest.PasswordTokenRequest = new PasswordTokenRequest;
  }

  public register(){
    this.registrationRequest.UserData = this.userData;
    this.registrationRequest.PasswordTokenRequest = this.passwordTokenRequest;
    console.log(this.userData);
  }
}
