import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Reports {

  constructor(private http:HttpClient) { }

  getDepartment(){
    return this.http.get('Department/summary')
  }

  getCustodian(){
    return this.http.get('Custodian/summary')
  }
}
