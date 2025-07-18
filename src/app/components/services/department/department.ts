import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Department {

   constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>('Department/summary'); // interceptor adds base URL
  }



  createDepartment(department: any): Observable<any> {
    return this.http.post('Department/create', department);
  }

  updateDepartment(id: string, department: any): Observable<any> {
    return this.http.put(`Department/update/${id}`, department);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`Department/delete/${id}`);
  }
}
