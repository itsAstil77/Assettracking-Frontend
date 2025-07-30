import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Brand {

  constructor(private http: HttpClient) { }

  getBrandsBySubSubCategoryId(subSubCategoryId: string) {
    return this.http.get<any[]>(`Brand/getbrandbysubsubcategory?id=${subSubCategoryId}`);
  }

  createBrand(brand: any) {
    return this.http.post(`Brand/create`, brand);
  }

  updateBrand(id: string, brand: any) {
    return this.http.put(`Brand/update/${id}`, brand);
  }


  deleteBrand(id: string) {
    return this.http.delete(`Brand/delete/${id}`);
  }


}
