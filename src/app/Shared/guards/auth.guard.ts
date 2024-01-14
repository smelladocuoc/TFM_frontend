import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private access_token: string = '';
  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select('auth').subscribe((auth) => {
      this.access_token = '';
      if (auth.credentials.access_token) {
        this.access_token = auth.credentials.access_token;
      }
    });
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.access_token) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
