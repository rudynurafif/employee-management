import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpolyeeService } from '../empolyee.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {

  employeeForm : FormGroup;

  group : string[] = [
    "Human Resources",
    "IT",
    "Marketing",
    "Operations",
    "Sales",
    "Finance"
  ]

  constructor(
    private _fb : FormBuilder,
    private _empService : EmpolyeeService,
    private readonly router : Router,
    private http : HttpClient
  ) {
    this.employeeForm = this._fb.group({
      username: '',
      firstName : '',
      lastName : '',
      email : '',
      birthDate : '',
      basicSalary : '',
      status : '',
      group : '',
      description : ''
    })
  }

  submitData() {
    if (this.employeeForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })  

      setTimeout(() => {
        this._empService.addEmployee(this.employeeForm.value).subscribe({
          next : (val : any) => {
            console.log(this.employeeForm.value)
            this.router.navigateByUrl('/employee')
          }, error : console.log
        })
      }, 1500);
    }
  }

}
