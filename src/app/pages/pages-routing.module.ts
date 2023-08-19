import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';

const routes: Routes = [
  {
    path : '',
    component : EmployeeListComponent,
  },
  {
    path : 'form',
    component : AddEmployeeComponent,
  },
  {
    path : 'form/:id',
    component : AddEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
