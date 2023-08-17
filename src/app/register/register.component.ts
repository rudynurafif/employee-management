import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { Router } from '@angular/router';

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
      fullName : [''],
      email : [''],
      password : ['']
    })
  }

  register() {
    this.http.post<any>('http://localhost:3000/registeredUsers', this.registerForm.value).subscribe(res => {
      alert("Register successful")
      this.registerForm.reset()
      this.router.navigate(['login'])
    }, err => {
      alert('Something went wrong')
    })
  }

}
