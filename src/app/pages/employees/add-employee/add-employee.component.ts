import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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

  employeeFound : any

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

  ngOnInit() {
    this.getDetail()
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

  formatCurrency(amount : any) {
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
    return formattedAmount;
  }

  getDetail() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this._empService.getEmployeeDetail(params['id']).subscribe((res: any | undefined) => {
          if (res) {
            this.employeeFound = res;
  
            this.employeeForm.setValue({
              // id: res.id,
              username: res.username,
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email,
              birthDate: new Date(res.birthDate),
              basicSalary: this.formatCurrency(res.basicSalary),
              status: res.status,
              group: res.group,
              description: new Date(res.description),
            });
          }
        });
      }
    });
  }

  get isFormInvalid() {
    return this.employeeForm.invalid;
  }

}
