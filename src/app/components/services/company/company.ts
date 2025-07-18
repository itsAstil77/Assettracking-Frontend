import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Company {

    constructor(private http: HttpClient) {}

  updateCompany(id: string, companyData: any) {
    return this.http.put(`companies/${id}`, companyData); // Interceptor handles base URL
  }
  deleteCompany(id: string): Observable<any> {
  return this.http.delete(`companies/${id}`);
}

createCompany(payload: any): Observable<any> {
  return this.http.post('companies', payload);
}

getCompany(){
  return this.http.get('companies')
}


}
