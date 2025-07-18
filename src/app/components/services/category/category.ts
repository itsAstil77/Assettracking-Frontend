import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Category {

  constructor(private http: HttpClient) { }

  getMainCategoryByGroupId(groupId: string): Observable<any[]> {
  return this.http.get<any[]>(`MainCategory/GetMainCategorybygroup?id=${groupId}`);
}

  createCategory(data: any): Observable<any> {
    return this.http.post<any>('MainCategory/create', data);
  }

updateMainCategory(id: string, body: any): Observable<any> {
  return this.http.put(`MainCategory/update/${id}`, body);
}


  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`MainCategory/delete/${id}`);
  }
}
