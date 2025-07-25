import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetDisposal {



  constructor(private http: HttpClient) {}

  disposeAssets(disposalData: any) {
    return this.http.post('AssetDisposal/process', disposalData);
  }

  assetDisposalGetById(id:string){
    return this.http.get(`AssetDisposal/${id}`)
  }

  getDisposalRequest(id:string){
    return this.http.get(`AssetDisposal/assets/${id}`)
  }
}
