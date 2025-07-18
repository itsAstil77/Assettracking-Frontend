import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Supplier {

   constructor(private http: HttpClient) {}

  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>('Supplier/all'); // base URL added by interceptor
  }

    createSupplier(body: any) {
    return this.http.post('Supplier/create', body);
  }

  updateSupplier(id: string, body: any) {
    return this.http.put(`Supplier/update/${id}`, body);
  }

  deleteSupplier(id: string) {
    return this.http.delete(`Supplier/delete/${id}`);
  }
}
