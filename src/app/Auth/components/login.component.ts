import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../actions';
import { AuthDTO } from '../models/auth.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  correo: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.correo = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      correo: this.correo,
      password: this.password,
    });
  }

  ngOnInit(): void { }

  login(): void {
    const credentials: AuthDTO = {
      correo: this.correo.value,
      password: this.password.value,
      id: '',
      access_token: '',
    };

    this.store.dispatch(AuthAction.login({ credentials }));
  }

  getErrorMessage(): any {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
  }
}
