import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { CollectionDTO } from "../models/collection.dto";

export const getCollectionsByUserId = createAction(
    '[CollectionsList Page] Get collections list',
    props<{ userId: string }>()
);
export const getCollectionsByUserIdSuccess = createAction(
    '[CollectionsList Page] Get collections list Success',
    props<{ collections: CollectionDTO[] }>()
);

export const getCollectionsByUserIdFailure = createAction(
    '[CollectionsList Page] Get collections list Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const getCollectionElement = createAction(
    '[ElementsList User Page] Get collection',
    props<{ elementId: string }>()
);
export const getCollectionElementSuccess = createAction(
    '[ElementsList User Page] Get collection Success',
    props<{ collections: CollectionDTO[] }>()
);

export const getCollectionElementFailure = createAction(
    '[ElementsList User Page] Get collection Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const deleteCollection = createAction(
    '[CollectionsList Page] Delete collection',
    props<{ collectionId: string }>()
);
export const deleteCollectionSuccess = createAction(
    '[CollectionsList Page] Delete collection Success',
    props<{ collectionId: string }>()
);

export const deleteCollectionFailure = createAction(
    '[CollectionsList Page] Delete collection Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const getCollectionById = createAction(
    '[CollectionForm Page] Get collection',
    props<{ collectionId: string }>()
);
export const getCollectionByIdSuccess = createAction(
    '[CollectionForm Page] Get collection Success',
    props<{ collection: CollectionDTO }>()
);

export const getCollectionByIdFailure = createAction(
    '[CollectionForm Page] Get collection Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const createCollection = createAction(
    '[CollectionForm Page] Create collection',
    props<{ collection: CollectionDTO }>()
);
export const createCollectionSuccess = createAction(
    '[CollectionForm Page] Create collection Success',
    props<{ collection: CollectionDTO }>()
);

export const createCollectionFailure = createAction(
    '[CollectionForm Page] Create collection Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const updateCollection = createAction(
    '[CollectionForm Page] Update collection',
    props<{ collectionId: string; collection: CollectionDTO }>()
);
export const updateCollectionSuccess = createAction(
    '[CollectionForm Page] Update collection Success',
    props<{ collectionId: string; collection: CollectionDTO }>()
);

export const updateCollectionFailure = createAction(
    '[CollectionForm Page] Update collection Failure',
    props<{ payload: HttpErrorResponse }>()
);