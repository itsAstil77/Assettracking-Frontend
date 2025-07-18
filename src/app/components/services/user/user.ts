import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`User/get-all`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post('User/create', userData);
  }
  updateUser(id: string, updatedData: any): Observable<any> {
    return this.http.put(`User/update/${id}`, updatedData);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`User/delete/${id}`);
  }



}
