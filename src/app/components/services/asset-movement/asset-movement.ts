import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetMovement {

  constructor(private http:HttpClient) { }

  createAssetMovement(assetMovement:any){
    return this.http.post(`AssetMovement`,assetMovement)
  }


}
