import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { EmployeeDetailComponent } from './employee-list/employee-detail/employee-detail.component';
import { AddEmployeeComponent } from './employee-list/add-employee/add-employee.component';
import { HttpClientModule } from '@angular/common/http'
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeesComponent } from './employee-list/employees/employees.component';



@NgModule({
  declarations: [
    EmployeeDetailComponent,
    AddEmployeeComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule
  ]
})
export class PagesModule { }
