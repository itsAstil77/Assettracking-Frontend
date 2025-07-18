import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Role {

  constructor(private http: HttpClient) { }

  getRoleAccessSummary(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`RoleAccess/summary?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  createRoleAccess(data: any): Observable<any> {
    return this.http.post('RoleAccess/create', data);
  }

  updateRoleAccess(id: string, data: any): Observable<any> {
    return this.http.put(`RoleAccess/update/${id}`, data);
  }

  deleteRoleAccess(id: string): Observable<any> {
  return this.http.delete(`RoleAccess/delete/${id}`);
}



}
