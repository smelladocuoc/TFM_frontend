import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CollectionFormComponent } from './components/collection-form/collection-form.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CollectionListUserComponent } from './components/collection-list-user/collection-list-user.component';



@NgModule({
  declarations: [CollectionsListComponent, CollectionFormComponent, CollectionListUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ]
})
export class CollectionModule { }
