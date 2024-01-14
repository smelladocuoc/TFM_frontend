import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../models/user.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserAction from '../../actions';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;

  usuario: FormControl;
  correo: FormControl;
  password: FormControl;
  password_confirmation: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.registerUser = new UserDTO('', '', '', '');

    this.isValidForm = null;

    this.usuario = new FormControl(this.registerUser.usuario, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.correo = new FormControl(this.registerUser.correo, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.password_confirmation = new FormControl(this.registerUser.password_confirmation, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.registerForm = this.formBuilder.group({
      usuario: this.usuario,
      correo: this.correo,
      password: this.password,
      password_confirmation: this.password_confirmation,
    });
  }

  ngOnInit(): void { }

  register(): void {
    this.isValidForm = false;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    const user: UserDTO = {
      usuario: this.registerUser.usuario,
      correo: this.registerUser.correo,
      password: this.registerUser.password,
      password_confirmation: this.registerUser.password_confirmation,
    };

    this.store.dispatch(UserAction.register({ user }));
  }
}
