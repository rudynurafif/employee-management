import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm !: FormGroup

  constructor( 
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router
    ) {}

  ngOnInit() : void {
    this.registerForm = this.formBuilder.group({
      fullName : ['', Validators.required, Validators.minLength(3)],
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  form(property : string) : FormGroup {
    return this.registerForm.get(property) as FormGroup
  }

  register() {
    this.http.post<any>('http://localhost:3000/registeredUsers', this.registerForm.value).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      }) 
      this.registerForm.reset()
      this.router.navigate(['login'])
    }, err => {
      alert('Something went wrong')
    })
  }

}
