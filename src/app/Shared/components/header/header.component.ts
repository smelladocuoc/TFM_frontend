import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../../../Auth/actions';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  showAdminSection: boolean;
  showAppImage: boolean;
  otherScroll = window.pageYOffset;
  auth: Number;
  admin: Number;

  x = fromEvent(document, 'scroll');

  constructor(private router: Router, private store: Store<AppState>) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    this.showAdminSection = false;
    this.showAppImage = true;
    this.auth = 0;
    this.admin = 0;
    this.x.subscribe((res: any) => {
      const scroll = res.target.documentElement.scrollTop;

      if (scroll > 100) {
        this.showAppImage = false;
        if (this.showAuthSection == true) {
          this.auth = 1;
          this.showAuthSection = false;
        } else if (this.showAdminSection == true) {
          this.admin = 1;
          this.showAdminSection = false;
        }
      }
      if (scroll < this.otherScroll) {
        this.showAppImage = true;
        if (this.auth == 1) {
          this.auth = 0;
          this.showAuthSection = true;
        } else if (this.admin == 1) {
          this.admin = 0;
          this.showAdminSection = true;
        }
      }
      this.otherScroll = scroll;
    });
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      this.showAuthSection = false;
      this.showNoAuthSection = true;
      this.showAdminSection = false;
      if (auth.credentials.access_token) {
        this.showAuthSection = true;
        this.showNoAuthSection = false;
        this.showAdminSection = false;
        if (auth.credentials.correo == 'admin@gmail.com') {
          this.showAuthSection = false;
          this.showNoAuthSection = false;
          this.showAdminSection = true;
        }
      }
    });
  }

  home(): void {
    this.router.navigateByUrl('home');
  }
  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  collections(): void {
    this.router.navigateByUrl('usercollections');
  }

  elementscharts(): void {
    this.router.navigateByUrl('elementscharts');
  }

  adminElements(): void {
    this.router.navigateByUrl('elements');
  }

  adminCollections(): void {
    this.router.navigateByUrl('collections');
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  logout(): void {
    this.store.dispatch(AuthAction.logout());
    this.router.navigateByUrl('login');
  }
}
