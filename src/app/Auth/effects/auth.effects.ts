import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import * as AuthActions from '../actions';
import { AuthDTO } from "../models/auth.dto";
import { AuthService } from "../services/auth.service";
import { SharedService } from "src/app/Shared/services/shared.service";

@Injectable()
export class AuthEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private sharedService: SharedService
    ) {
        this.responseOK = false;
    }
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ credentials }) =>
                this.authService.login(credentials).pipe(
                    map((userToken) => {
                        const credentialsTemp: AuthDTO = {
                            correo: credentials.correo,
                            password: credentials.password,
                            id: userToken.usuario.id,
                            access_token: userToken.token,
                        };
                        console.log(userToken.usuario.id);

                        return AuthActions.loginSuccess({ credentials: credentialsTemp });
                    }),
                    catchError((error) => {
                        return of(AuthActions.loginFailure({ payload: error }));
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'loginFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('home');
                        }
                    })
                )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    loginFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );
}
