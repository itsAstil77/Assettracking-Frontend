import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Custodian {

  constructor(private http: HttpClient) {}

  getCustodians(): Observable<any[]> {
    return this.http.get<any[]>('Custodian/summary'); // Base URL handled by interceptor
  }

  createCustodian(data: any) {
  return this.http.post('custodian/create', data); // Uses interceptor for base URL
}

updateCustodian(id: string, data: any) {
  return this.http.put(`custodian/update/${id}`, data);
}

deleteCustodian(id: string) {
  return this.http.delete(`custodian/delete/${id}`);
}


}
