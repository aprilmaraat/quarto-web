import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { PasswordTokenRequest } from '../../models/password-token-request';
import { RegistrationRequest } from '../../models/registration-request';
import { AuthService } from '../../services/auth.service';
import { UserType } from 'src/app/models/enum';

@Component({
  selector: 'q-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registrationRequest = new RegistrationRequest;
  public userData = new UserData;
  public passwordTokenRequest = new PasswordTokenRequest;

  constructor(private _authService: AuthService) 
  {
  }

  ngOnInit() {
  }

  public register(){
    this.registrationRequest.UserData = this.userData;
    this.passwordTokenRequest.UserName = this.userData.EmailAddress;
    this.passwordTokenRequest.UserType = UserType.Tenant;
    this.registrationRequest.PasswordTokenRequest = this.passwordTokenRequest;

    this._authService.registerUser(this.registrationRequest).pipe()
      .subscribe(data => {
        console.log(data);
      });
  }
}
