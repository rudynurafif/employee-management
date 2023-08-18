import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './employee-list/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './employee-list/employee-detail/employee-detail.component';
import { EmployeesComponent } from './employee-list/employees/employees.component';

const routes: Routes = [
  {
    path : '',
    component : EmployeeListComponent,
    children : [
      { path : 'employees', component : EmployeesComponent },
      { path : 'add-employee', component : AddEmployeeComponent },
      { path : 'employee-detail/:id', component : EmployeeDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
