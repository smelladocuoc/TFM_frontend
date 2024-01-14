import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Auth/effects/auth.effects';
import * as AuthReducer from './Auth/reducers';
import { UserEffects } from './User/effects/user.effects';
import * as UserReducer from './User/reducers';
import { CollectionsEffects } from './Collections/effects';
import * as CollectionsReducer from './Collections/reducers';
import { ElementsEffects } from './Element/effects';
import * as ElementsReducer from './Element/reducers';

export interface AppState {
  auth: AuthReducer.AuthState;
  user: UserReducer.UserState;
  collections: CollectionsReducer.CollectionsState;
  elements: ElementsReducer.ElementsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  user: UserReducer.userReducer,
  collections: CollectionsReducer.collectionsReducer,
  elements: ElementsReducer.elementsReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects,
  CollectionsEffects,
  ElementsEffects,
];
