import { Action, createReducer, on } from "@ngrx/store";
import { CollectionDTO } from "../models/collection.dto";
import { createCollection, createCollectionFailure, createCollectionSuccess, deleteCollection, deleteCollectionFailure, deleteCollectionSuccess, getCollectionById, getCollectionByIdFailure, getCollectionByIdSuccess, getCollectionElement, getCollectionElementFailure, getCollectionElementSuccess, getCollectionsByUserId, getCollectionsByUserIdFailure, getCollectionsByUserIdSuccess, updateCollection, updateCollectionFailure, updateCollectionSuccess } from "../actions";

export interface CollectionsState {
    collections: CollectionDTO[];
    collection: CollectionDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: CollectionsState = {
    collections: new Array<CollectionDTO>(),
    collection: new CollectionDTO('', '', ''),
    loading: false,
    loaded: false,
    error: null,
};

const _collectionsReducer = createReducer(
    initialState,
    on(getCollectionsByUserId, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getCollectionsByUserIdSuccess, (state, action) => ({
        ...state,
        collections: action.collections,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getCollectionsByUserIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(getCollectionElement, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getCollectionElementSuccess, (state, action) => ({
        ...state,
        collections: action.collections,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getCollectionElementFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(deleteCollection, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(deleteCollectionSuccess, (state, { collectionId }) => ({
        ...state,
        collections: [
            ...state.collections.filter(
                (collection) => collection.id !== collectionId
            ),
        ],
        loading: false,
        loaded: true,
        error: null,
    })),
    on(deleteCollectionFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(getCollectionById, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getCollectionByIdSuccess, (state, action) => ({
        ...state,
        collection: action.collection,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getCollectionByIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(createCollection, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(createCollectionSuccess, (state, action) => ({
        ...state,
        collection: action.collection,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(createCollectionFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(updateCollection, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(updateCollectionSuccess, (state, action) => ({
        ...state,
        collection: action.collection,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(updateCollectionFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    }))
);

export function collectionsReducer(
    state: CollectionsState | undefined,
    action: Action
): CollectionsState {
    return _collectionsReducer(state, action);
}