import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from '../Shared/components/card.component';
import { ElementFormComponent } from './components/element-form/element-form.component';
import { ElementListComponent } from './components/element-list/element-list.component';
import { FormatDatePipe } from '../Shared/pipes/format-date.pipe';
import { HomeComponent } from './components/home/home.component';
import { ElementListUserComponent } from './components/element-list-user/element-list-user.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ElementListNouserComponent } from './components/element-list-nouser/element-list-nouser.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ElementFormUserComponent } from './components/element-form-user/element-form-user.component';
import { ElementChartsComponent } from './components/element-charts/element-charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [ElementListComponent,
    ElementFormComponent,
    FormatDatePipe,
    CardComponent,
    HomeComponent,
    ElementListUserComponent,
    ElementListNouserComponent,
    ElementFormUserComponent,
    ElementChartsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    NgxMatFileInputModule,
    NgxChartsModule
  ]
})
export class ElementModule { }
