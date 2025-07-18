import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sector {

   constructor(private http: HttpClient) {}

  getSectors(): Observable<any[]> {
    return this.http.get<any[]>('Sector/summary'); // base URL handled by interceptor
  }


  createSector(data: Sector): Observable<any> {
    return this.http.post('Sector/create', data);
  }

  // Update sector by ID
  updateSector(id: string, data: Sector): Observable<any> {
    return this.http.put(`Sector/update/${id}`, data);
  }

  // Delete sector by ID
  deleteSector(id: string): Observable<any> {
    return this.http.delete(`Sector/delete/${id}`);
  }
}
