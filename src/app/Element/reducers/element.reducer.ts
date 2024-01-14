import { Action, createReducer, on } from "@ngrx/store";
import { ElementDTO } from "../models/element.dto";
import { createElement, createElementFailure, createElementSuccess, deleteElement, deleteElementFailure, deleteElementSuccess, deleteElementUser, deleteElementUserFailure, deleteElementUserSuccess, getElementById, getElementByIdFailure, getElementByIdSuccess, getElements, getElementsByUserId, getElementsByUserIdFailure, getElementsByUserIdSuccess, getElementsCollection, getElementsCollectionFailure, getElementsCollectionSuccess, getElementsFailure, getElementsNouserCollection, getElementsNouserCollectionFailure, getElementsNouserCollectionSuccess, getElementsSuccess, updateCommentElement, updateCommentElementFailure, updateCommentElementSuccess, updateElement, updateElementFailure, updateElementSuccess } from "../actions";

export interface ElementsState {
    elements: ElementDTO[];
    element: ElementDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: ElementsState = {
    elements: new Array<ElementDTO>(),
    element: new ElementDTO('', '', new Date(), ''),
    loading: false,
    loaded: false,
    error: null,
};

const _elementsReducer = createReducer(
    initialState,
    on(getElementsByUserId, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getElementsByUserIdSuccess, (state, action) => ({
        ...state,
        elements: action.elements,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getElementsByUserIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(getElementsCollection, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getElementsCollectionSuccess, (state, action) => ({
        ...state,
        elements: action.elements,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getElementsCollectionFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(getElementsNouserCollection, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getElementsNouserCollectionSuccess, (state, action) => ({
        ...state,
        elements: action.elements,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getElementsNouserCollectionFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(deleteElement, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(deleteElementSuccess, (state, { elementId }) => ({
        ...state,
        elements: [...state.elements.filter((element) => element.elementId !== elementId)],
        loading: false,
        loaded: true,
        error: null,
    })),
    on(deleteElementFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(deleteElementUser, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(deleteElementUserSuccess, (state, { elementId }) => ({
        ...state,
        elements: [...state.elements.filter((element) => element.elementId !== elementId)],
        loading: false,
        loaded: true,
        error: null,
    })),
    on(deleteElementUserFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(getElementById, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getElementByIdSuccess, (state, action) => ({
        ...state,
        element: action.element,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getElementByIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(createElement, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(createElementSuccess, (state, action) => ({
        ...state,
        element: action.element,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(createElementFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(updateElement, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(updateElementSuccess, (state, action) => ({
        ...state,
        element: action.element,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(updateElementFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(updateCommentElement, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(updateCommentElementSuccess, (state, action) => ({
        ...state,
        comment: action.comment,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(updateCommentElementFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(getElements, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getElementsSuccess, (state, action) => ({
        ...state,
        elements: action.elements,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getElementsFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
);

export function elementsReducer(
    state: ElementsState | undefined,
    action: Action
): ElementsState {
    return _elementsReducer(state, action);
}