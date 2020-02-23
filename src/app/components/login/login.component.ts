import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordTokenRequest } from '../../models/password-token-request';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../custom-modules/_alert/alert.service';
import { LoadService } from '../../custom-modules/load-overlay/load-overlay.service';

@Component({
  selector: 'q-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  public passwordTokenRequest = new PasswordTokenRequest;
  public error = { emailAddress: false, password: false };
  public returnUrl: string;

  constructor(private authService: AuthService
    , private alertService: AlertService
    , private loadService: LoadService
    , private router: Router) {
      this.loadService.load(false);
      if (this.authService.currentUserValue) {
          this.router.navigate(['/']);
      }
    }

  public login() {
    if (this.passwordTokenRequest.EmailAddress !== undefined && this.passwordTokenRequest.Password !== undefined) {
      this.error.emailAddress = false;
      this.error.password = false;
      this.loadService.load(true);
      this.authService.loginUser(this.passwordTokenRequest).subscribe(response => {
        if(!response.wasSuccess){ 
          this.alertService.error(response.messageText);
        }
        this.alertService.clear();
        this.loadService.load(false);
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
      }, (err) => {
        this.alertService.error(err.error);
        this.loadService.load(false);
      });
    }
    else {
      this.alertService.error('All fields are required. Please check the errors.');
      this.error.emailAddress = (this.passwordTokenRequest.EmailAddress == undefined);
      this.error.password = (this.passwordTokenRequest.Password == undefined);
      this.loadService.load(false);
    }
  }
}