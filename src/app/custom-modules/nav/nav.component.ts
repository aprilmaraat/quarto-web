import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadService } from '../../custom-modules/load-overlay/load-overlay.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'q-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  constructor(private authService: AuthService
    , private router: Router
    , private loadService: LoadService){
      this.loadService.load(false);
    }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}