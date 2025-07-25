import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Model {

  constructor(private http:HttpClient) { }


  getModelsByBrandId(brandId: string) {
    return this.http.get<any[]>(`Model/getmodelbybrand?id=${brandId}`);
  }

  createModel(payload: any) {
  return this.http.post<any>('Model/create', payload);
}

updateModel(id: string,model: any) {
  return this.http.put<any>(`Model/update/${id}`,model);
}

deleteModel(id: string) {
  return this.http.delete<any>(`Model/delete/${id}`);
}

getModel(){
  return this.http.get(`Model/summary`)
}



}
