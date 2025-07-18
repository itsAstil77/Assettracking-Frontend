import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Subcategory {

  constructor(private http: HttpClient) { }


  getSubCategoriesByMainCategory(mainCategoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`SubCategory/Getsubcategorybymaincategory?id=${mainCategoryId}`);
  }

  createSubCategory(data: any) {
    return this.http.post(`SubCategory/create`, data);
  }

  updateSubCategory(id: string, data: any) {
  return this.http.put(`SubCategory/update/${id}`, data);
}

deleteSubCategory(id: string) {
  return this.http.delete(`SubCategory/delete/${id}`);
}



}
