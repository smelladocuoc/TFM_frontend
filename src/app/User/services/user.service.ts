import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { UserDTO } from '../models/user.dto';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'api';
    this.urlBlogUocApi = 'https://tfmbackend-production.up.railway.app/' + this.controller;
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(this.urlBlogUocApi + "/registro", user)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(this.urlBlogUocApi + '/usuario/update/' + userId, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(this.urlBlogUocApi + '/usuario/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
