import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../models/user.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../../actions';
import { Store } from '@ngrx/store';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileUser: UserDTO;

  usuario: FormControl;
  correo: FormControl;
  password: FormControl;
  password_confirmation: FormControl;

  profileForm: FormGroup;
  isValidForm: boolean | null;

  private userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.profileUser = new UserDTO('', '', '', '');

    this.isValidForm = null;

    this.usuario = new FormControl(this.profileUser.usuario, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.correo = new FormControl(this.profileUser.correo, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.profileUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.password_confirmation = new FormControl(this.profileUser.password_confirmation, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.profileForm = this.formBuilder.group({
      usuario: this.usuario,
      correo: this.correo,
      password: this.profileUser.password,
      password_confirmation: this.profileUser.password_confirmation,
    });

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.id) {
        this.userId = auth.credentials.id;
      }
    });

    this.store.select('user').subscribe((user) => {
      this.profileUser = user.user;


      this.usuario.setValue(this.profileUser.usuario);
      this.correo.setValue(this.profileUser.correo);
      this.password.setValue(this.profileUser.password);
      this.password_confirmation.setValue(this.profileUser.password_confirmation);


      this.profileForm = this.formBuilder.group({
        usuario: this.usuario,
        correo: this.correo,
        password: this.password,
        password_confirmation: this.password_confirmation,


      });
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.store.dispatch(UserAction.getUserById({ userId: this.userId }));
    }
  }

  updateUser(): void {
    this.isValidForm = false;

    if (this.profileForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.profileUser = this.profileForm.value;



    if (this.userId) {
      this.store.dispatch(
        UserAction.updateUser({ userId: this.userId, user: this.profileUser })
      );
    }
  }
}
