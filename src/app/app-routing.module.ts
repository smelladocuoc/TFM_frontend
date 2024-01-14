import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login.component';
import { RegisterComponent } from './User/components/register/register.component';
import { CollectionFormComponent } from './Collections/components/collection-form/collection-form.component';
import { CollectionsListComponent } from './Collections/components/collections-list/collections-list.component';
import { ElementListComponent } from './Element/components/element-list/element-list.component';
import { ElementFormComponent } from './Element/components/element-form/element-form.component';
import { AuthGuard } from './Shared/guards/auth.guard';
import { HomeComponent } from './Element/components/home/home.component';
import { ElementListUserComponent } from './Element/components/element-list-user/element-list-user.component';
import { CollectionListUserComponent } from './Collections/components/collection-list-user/collection-list-user.component';
import { ElementListNouserComponent } from './Element/components/element-list-nouser/element-list-nouser.component';
import { ProfileComponent } from './User/components/profile/profile.component';
import { ElementFormUserComponent } from './Element/components/element-form-user/element-form-user.component';
import { ElementChartsComponent } from './Element/components/element-charts/element-charts.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user/collection/:id',
    component: CollectionFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/element/:id',
    component: ElementFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'element/user/:id',
    component: ElementFormUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'elements/collection/:collectionId/:id',
    component: ElementListUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'elementscharts',
    component: ElementChartsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'elements/nouser/collection/:collectionId',
    component: ElementListNouserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'elements',
    component: ElementListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usercollections',
    component: CollectionListUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'collections',
    component: CollectionsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
