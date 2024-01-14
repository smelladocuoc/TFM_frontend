import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, finalize, map, of } from "rxjs";
import * as CollectionActions from '../actions';
import { SharedService } from "src/app/Shared/services/shared.service";
import { CollectionService } from "../services/collection.service";

@Injectable()
export class CollectionsEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(
        private actions$: Actions,
        private collectionService: CollectionService,
        private sharedService: SharedService,
        private router: Router
    ) {
        this.responseOK = false;
    }

    getCollectionsByUserId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CollectionActions.getCollectionsByUserId),
            exhaustMap(({ userId }) =>
                this.collectionService.getCollectionsByUserId(userId).pipe(
                    map((collections) => {
                        return CollectionActions.getCollectionsByUserIdSuccess({
                            collections: collections,
                        });
                    }),
                    catchError((error) => {
                        return of(
                            CollectionActions.getCollectionsByUserIdFailure({ payload: error })
                        );
                    })
                )
            )
        )
    );

    getCollectionsByUserIdFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CollectionActions.getCollectionsByUserIdFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    getCollectionElement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CollectionActions.getCollectionElement),
            exhaustMap(({ elementId }) =>
                this.collectionService.getCollectionElement(elementId).pipe(
                    map((collections) => {


                        return CollectionActions.getCollectionElementSuccess({
                            collections: collections,
                        });
                    }),
                    catchError((error) => {
                        return of(CollectionActions.getCollectionElementFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getCollectionElementSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CollectionActions.getCollectionElementSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    getCollectionElementFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CollectionActions.getCollectionElementFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    deleteCollection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CollectionActions.deleteCollection),
            exhaustMap(({ collectionId }) =>
                this.collectionService.deleteCollection(collectionId).pipe(
                    map(() => {
                        return CollectionActions.deleteCollectionSuccess({
                            collectionId: collectionId,
                        });
                    }),
                    catchError((error) => {
                        return of(
                            CollectionActions.deleteCollectionFailure({ payload: error })
                        );
                    })
                )
            )
        )
    );

    deleteCollectionFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CollectionActions.deleteCollectionFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    getCollectionById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CollectionActions.getCollectionById),
            exhaustMap(({ collectionId }) =>
                this.collectionService.getCollectionById(collectionId).pipe(
                    map((collection) => {
                        return CollectionActions.getCollectionByIdSuccess({
                            collection: collection,
                        });
                    }),
                    catchError((error) => {
                        return of(
                            CollectionActions.getCollectionByIdFailure({ payload: error })
                        );
                    })
                )
            )
        )
    );

    getCollectionByIdFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CollectionActions.getCollectionByIdFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    createCollection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CollectionActions.createCollection),
            exhaustMap(({ collection }) =>
                this.collectionService.createCollection(collection).pipe(
                    map((collection) => {
                        return CollectionActions.createCollectionSuccess({
                            collection: collection,
                        });
                    }),
                    catchError((error) => {
                        return of(
                            CollectionActions.createCollectionFailure({ payload: error })
                        );
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'collectionFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('collections');
                        }
                    })
                )
            )
        )
    );

    createCollectionSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CollectionActions.createCollectionSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    createCollectionFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CollectionActions.createCollectionFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    updateCollection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CollectionActions.updateCollection),
            exhaustMap(({ collectionId, collection }) =>
                this.collectionService.updateCollection(collectionId, collection).pipe(
                    map((collection) => {
                        return CollectionActions.updateCollectionSuccess({
                            collectionId: collectionId,
                            collection: collection,
                        });
                    }),
                    catchError((error) => {
                        return of(
                            CollectionActions.updateCollectionFailure({ payload: error })
                        );
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'collectionFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('collections');
                        }
                    })
                )
            )
        )
    );

    updateCollectionSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CollectionActions.updateCollectionSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    updateCollectionFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CollectionActions.updateCollectionFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );
}