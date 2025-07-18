import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Subsubcategory {

  constructor(private http:HttpClient) { }

  getSubSubCategoriesBySubCategoryId(subCategoryId: string) {
  return this.http.get<any[]>(`SubSubCategory/GetSubsubcategorybysubcategory?id=${subCategoryId}`);
}

createSubSubCategory(data: any) {
  return this.http.post('SubSubCategory/create', data);
}

updateSubSubCategory(id: string, data: any) {
  return this.http.put(`SubSubCategory/update/${id}`, data);
}

deleteSubSubCategory(id: string) {
  return this.http.delete(`SubSubCategory/delete/${id}`);
}



}
