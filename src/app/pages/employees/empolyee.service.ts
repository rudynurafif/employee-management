import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpolyeeService {

  constructor(private _http : HttpClient) { }

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employeeData', data);
  }

  getAllEmployee(): Observable<any> {
    return this._http.get('http://localhost:3000/employeeData');
  }
}
