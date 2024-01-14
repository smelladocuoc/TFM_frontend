import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, finalize, map, of } from "rxjs";
import * as ElementActions from '../actions';
import { SharedService } from "src/app/Shared/services/shared.service";
import { ElementService } from "../services/element.service";

@Injectable()
export class ElementsEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(
        private actions$: Actions,
        private elementService: ElementService,
        private sharedService: SharedService,
        private router: Router
    ) {
        this.responseOK = false;
    }

    getElementsByUserId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.getElementsByUserId),
            exhaustMap(({ userId }) =>
                this.elementService.getElementsByUserId(userId).pipe(
                    map((elements) => {


                        return ElementActions.getElementsByUserIdSuccess({
                            elements: elements,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.getElementsByUserIdFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getElementsByUserIdSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.getElementsByUserIdSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    getElementsByUserIdFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.getElementsByUserIdFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    getElementsCollection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.getElementsCollection),
            exhaustMap(({ collectionId, userId }) =>
                this.elementService.getElementsCollection(collectionId, userId).pipe(
                    map((elements) => {


                        return ElementActions.getElementsCollectionSuccess({
                            elements: elements,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.getElementsCollectionFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getElementsCollectionSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.getElementsCollectionSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    getElementsCollectionFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.getElementsCollectionFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    getElementsNouserCollection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.getElementsNouserCollection),
            exhaustMap(({ collectionId, userId }) =>
                this.elementService.getElementsNouserCollection(collectionId, userId).pipe(
                    map((elements) => {


                        return ElementActions.getElementsNouserCollectionSuccess({
                            elements: elements,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.getElementsNouserCollectionFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getElementsNouserCollectionSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.getElementsNouserCollectionSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    getElementsNouserCollectionFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.getElementsNouserCollectionFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    deleteElement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.deleteElement),
            exhaustMap(({ elementId }) =>
                this.elementService.deleteElement(elementId).pipe(
                    map(() => {
                        return ElementActions.deleteElementSuccess({
                            elementId: elementId,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.deleteElementFailure({ payload: error }));
                    })
                )
            )
        )
    );

    deleteElementFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.deleteElementFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    deleteElementUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.deleteElementUser),
            exhaustMap(({ elementId, userId }) =>
                this.elementService.deleteElementUser(elementId, userId).pipe(
                    map(() => {
                        return ElementActions.deleteElementUserSuccess({
                            elementId: elementId,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.deleteElementUserFailure({ payload: error }));
                    })
                )
            )
        )
    );

    deleteElementUserFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.deleteElementUserFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    getElementById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.getElementById),
            exhaustMap(({ elementId }) =>
                this.elementService.getElementById(elementId).pipe(
                    map((element) => {
                        return ElementActions.getElementByIdSuccess({
                            element: element,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.getElementByIdFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getElementByIdFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.getElementByIdFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    createElement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.createElement),
            exhaustMap(({ element, selectedValue }) =>
                this.elementService.createElement(element, selectedValue).pipe(
                    map((element) => {
                        return ElementActions.createElementSuccess({
                            element: element,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.createElementFailure({ payload: error }));
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'elementFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('elements');
                        }
                    })
                )
            )
        )
    );

    createElementSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.createElementSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    createElementFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.createElementFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    updateElement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.updateElement),
            exhaustMap(({ elementId, element, selectedValue }) =>
                this.elementService.updateElement(elementId, element, selectedValue).pipe(
                    map((element) => {
                        return ElementActions.updateElementSuccess({
                            elementId: elementId,
                            element: element,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.updateElementFailure({ payload: error }));
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'elementFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('elements');
                        }
                    })
                )
            )
        )
    );

    updateElementSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.updateElementSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    updateElementFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.updateElementFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    updateCommentElement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.updateCommentElement),
            exhaustMap(({ elementId, comment }) =>
                this.elementService.updateCommentElement(elementId, comment).pipe(
                    map((element) => {
                        return ElementActions.updateCommentElementSuccess({
                            elementId: elementId,
                            comment: comment,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.updateCommentElementFailure({ payload: error }));
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'elementFeedback',
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

    updateCommentElementSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.updateCommentElementSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    updateCommentElementFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.updateCommentElementFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    addElementUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.addElementUser),
            exhaustMap(({ elementsIdArray, userId }) =>
                this.elementService.addElementUser(elementsIdArray, userId).pipe(
                    map((element) => {
                        return ElementActions.addElementUserSuccess({
                            elementsIdArray: elementsIdArray,
                            userId: userId,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.addElementUserFailure({ payload: error }));
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'elementFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('usercollections');
                        }
                    })
                )
            )
        )
    );

    addElementUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.addElementUserSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    addElementUserFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.addElementUserFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    getElements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ElementActions.getElements),
            exhaustMap(() =>
                this.elementService.getElements().pipe(
                    map((elements) => {
                        return ElementActions.getElementsSuccess({
                            elements: elements,
                        });
                    }),
                    catchError((error) => {
                        return of(ElementActions.getElementsFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getElementsFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ElementActions.getElementsFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );
}