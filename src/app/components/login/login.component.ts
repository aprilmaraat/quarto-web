import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordTokenRequest } from '../../models/password-token-request';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../custom-modules/_alert/alert.service';
import { LoadService } from '../../custom-modules/load-overlay/load-overlay.service';
import { GenericComponent } from '../generic/generic.component';

@Component({
  selector: 'q-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends GenericComponent{
  public passwordTokenRequest = new PasswordTokenRequest;
  public error = { emailAddress: false, password: false };
  public returnUrl: string;

  constructor(authService: AuthService
    , private alertService: AlertService
    , private loadService: LoadService
    , private router: Router
    , private route: ActivatedRoute) {
      super(authService);
    this.loadService.load(false);
    if (authService.currentUserValue) {
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

  public login() {
    if (!this.checkStringIfEmpty(this.passwordTokenRequest.EmailAddress) && !this.checkStringIfEmpty(this.passwordTokenRequest.Password)) {
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
          this.router.navigate([this.returnUrl]);
        }
      }, (err) => {
        this.alertService.error(err.error);
        this.loadService.load(false);
      });
    }
    else {
      this.alertService.error('All fields are required. Please check the errors.');
      this.error.emailAddress = (this.checkStringIfEmpty(this.passwordTokenRequest.EmailAddress));
      this.error.password = (this.checkStringIfEmpty(this.passwordTokenRequest.Password));
      this.loadService.load(false);
    }
  }
}