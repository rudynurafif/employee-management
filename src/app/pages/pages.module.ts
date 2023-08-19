import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    AddEmployeeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PagesModule { }
