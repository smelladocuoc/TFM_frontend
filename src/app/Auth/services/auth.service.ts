import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDTO } from '../models/auth.dto';
import { Observable, catchError } from 'rxjs';
import { SharedService } from 'src/app/Shared/services/shared.service';

export interface AuthToken {
  usuario: AuthDTO;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'api/login';
    this.urlBlogUocApi = 'https://lugardecoleccionestfm.000webhostapp.com/' + this.controller;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.urlBlogUocApi, auth)
      .pipe(catchError(this.sharedService.handleError));
  }
}
