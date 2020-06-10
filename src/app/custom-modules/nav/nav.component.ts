import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadService } from '../../custom-modules/load-overlay/load-overlay.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../_alert';
import { Observable } from 'rxjs';
import { GenericComponent } from 'src/app/components/generic/generic.component';

@Component({
  selector: 'q-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  isLoggedIn$: Observable<boolean>;
  showAccountMenu = false;

  constructor(private authService: AuthService
    , private alertService: AlertService
    , private loadService: LoadService
    , private router: Router) {
        this.isLoggedIn$ = this.authService.isLoggedIn;
    }

  homePage(){
    this.router.navigate(['']);
  }

  accountMenuToggle(){
    this.showAccountMenu = !this.showAccountMenu;
  }

  toggleAccountMenu(){
    this.showAccountMenu = !this.showAccountMenu;
  }

  logout(){
    this.resetValues();
    this.authService.logout();
    this.router.navigate(['/login']);
    this.alertService.success('Successfully logged out.');
  }

  resetValues(){
    this.showAccountMenu = false;
  }
}