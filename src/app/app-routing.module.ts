import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path : 'employee-list',
    loadChildren : () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  { path : '', redirectTo : 'login', pathMatch : 'full' },
  { path : 'login', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : '**', component : NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
