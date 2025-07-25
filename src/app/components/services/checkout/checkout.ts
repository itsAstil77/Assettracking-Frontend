import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Checkout {

  constructor(private http: HttpClient) { }


  GetAsset() {
    return this.http.get('Asset/summary')
  }

    submitCheckOut(data:any){
    return this.http.post('AssetCheckout',data)
  }

}
