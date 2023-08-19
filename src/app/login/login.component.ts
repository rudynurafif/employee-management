import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm !: FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router
  ) {}

  ngOnInit() : void {
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  login() {
    this.http.get<any>('http://localhost:3000/registeredUsers')
    .subscribe(res => {
      const user = res.find((u : any) => {
        return u.email === this.loginForm.value.email && u.password === this.loginForm.value.password
      })
      if (user) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully login!',
          showConfirmButton: false,
          timer: 1500
        })
        this.loginForm.reset()
        this.router.navigate(['employee'])
      } else {
        alert('email / password is incorrect!')
      }
    }, err => alert('Something went wrong..'))
  }

}
