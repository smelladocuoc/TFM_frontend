import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ElementDTO } from '../models/element.dto';
import { CollectionDTO } from 'src/app/Collections/models/collection.dto';

export const getElementsByUserId = createAction(
    '[ElementsList Page] Get elements list',
    props<{ userId: string }>()
);
export const getElementsByUserIdSuccess = createAction(
    '[ElementsList Page] Get elements list Success',
    props<{ elements: ElementDTO[] }>()
);

export const getElementsByUserIdFailure = createAction(
    '[ElementsList Page] Get elements list Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const getElementsCollection = createAction(
    '[ElementsList User Page] Get elements list',
    props<{ collectionId: string, userId: string }>()
);
export const getElementsCollectionSuccess = createAction(
    '[ElementsList User Page] Get elements list Success',
    props<{ elements: ElementDTO[] }>()
);

export const getElementsCollectionFailure = createAction(
    '[ElementsList User Page] Get elements list Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const getElementsNouserCollection = createAction(
    '[ElementsList Nouser Page] Get elements list',
    props<{ collectionId: string, userId: string }>()
);
export const getElementsNouserCollectionSuccess = createAction(
    '[ElementsList Nouser Page] Get elements list Success',
    props<{ elements: ElementDTO[] }>()
);

export const getElementsNouserCollectionFailure = createAction(
    '[ElementsList Nouser Page] Get elements list Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const deleteElement = createAction(
    '[ElementsList Page] Delete element',
    props<{ elementId: string }>()
);
export const deleteElementSuccess = createAction(
    '[ElementsList Page] Delete element Success',
    props<{ elementId: string }>()
);

export const deleteElementFailure = createAction(
    '[ElementsList Page] Delete element Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const deleteElementUser = createAction(
    '[ElementsList Page] Delete element user',
    props<{ elementId: string, userId: string }>()
);
export const deleteElementUserSuccess = createAction(
    '[ElementsList Page] Delete element user Success',
    props<{ elementId: string }>()
);

export const deleteElementUserFailure = createAction(
    '[ElementsList Page] Delete element user Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const getElementById = createAction(
    '[ElementForm Page] Get element',
    props<{ elementId: string }>()
);
export const getElementByIdSuccess = createAction(
    '[ElementForm Page] Get element Success',
    props<{ element: ElementDTO }>()
);

export const getElementByIdFailure = createAction(
    '[ElementForm Page] Get element Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const createElement = createAction(
    '[ElementForm Page] Create element',
    props<{ element: ElementDTO, selectedValue: string }>()
);
export const createElementSuccess = createAction(
    '[ElementForm Page] Create element Success',
    props<{ element: ElementDTO }>()
);

export const createElementFailure = createAction(
    '[ElementForm Page] Create element Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const updateElement = createAction(
    '[ElementForm Page] Update element',
    props<{ elementId: string; element: ElementDTO; selectedValue: string }>()
);
export const updateElementSuccess = createAction(
    '[ElementForm Page] Update element Success',
    props<{ elementId: string; element: ElementDTO }>()
);

export const updateElementFailure = createAction(
    '[ElementForm Page] Update element Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const updateCommentElement = createAction(
    '[ElementForm Page] Update comment element',
    props<{ elementId: string; comment: String }>()
);
export const updateCommentElementSuccess = createAction(
    '[ElementForm Page] Update comment element Success',
    props<{ elementId: string; comment: String }>()
);

export const updateCommentElementFailure = createAction(
    '[ElementForm Page] Update comment element Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const addElementUser = createAction(
    '[ElementForm Page] Add element user',
    props<{ elementsIdArray: string[]; userId: string }>()
);
export const addElementUserSuccess = createAction(
    '[ElementForm Page] Add element user Success',
    props<{ elementsIdArray: string[]; userId: string }>()
);

export const addElementUserFailure = createAction(
    '[ElementForm Page] Add element user Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const getElements = createAction('[Home Page] Get elements list');
export const getElementsSuccess = createAction(
    '[Home Page] Get elements list Success',
    props<{ elements: ElementDTO[] }>()
);

export const getElementsFailure = createAction(
    '[Home Page] Get elements list Failure',
    props<{ payload: HttpErrorResponse }>()
);