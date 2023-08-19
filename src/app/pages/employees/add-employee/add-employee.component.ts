import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpolyeeService } from '../empolyee.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {

  employeeForm : FormGroup;

  group : string[] = [
    "Sales", "Marketing", "Finance", "Human Resources", "Operations", "IT", "Research and Development", "Customer Service", "Legal", "Administration"
  ]

  status : string[] = [
    "active", "inactive", "on leave"
  ]

  constructor(
    private _fb : FormBuilder,
    private _empService : EmpolyeeService,
    private readonly router : Router,
    private readonly route : ActivatedRoute,
    private http : HttpClient
  ) {
    this.employeeForm = this._fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required, this.birthDateAsyncValidator],
      basicSalary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  birthDateAsyncValidator(control: AbstractControl): Promise<{ [key: string]: boolean } | null> {
    return new Promise((resolve) => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (selectedDate > today) {
        resolve({ 'birthDateInvalid': true });
      } else {
        resolve(null);
      }
    });
  }

  submitData() {
    if (this.employeeForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Successfully create employee data',
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

  get isFormInvalid() {
    return this.employeeForm.invalid;
  }

}
