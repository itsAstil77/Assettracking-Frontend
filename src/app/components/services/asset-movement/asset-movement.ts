import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetMovement {

  constructor(private http:HttpClient) { }

  createAssetMovement(assetMovement:any){
    return this.http.post(`AssetMovement/process`,assetMovement)
  }
  
  getAssetDisposal(page: number, pageSize: number){
    return this.http.get(`AssetDisposal/ AssetDisposalsummary?page=${page}&pageSize=${pageSize}`)
  }

  getSitesByGroupId(id:any){
    return this.http.get(`companies/company-summary?GroupId=${id}`)
  }

  getSitesByCompanyId(id: string) {
  return this.http.get(`sites/Getsitesbycompany?CompanyId=${id}`);
}

getBuildingsBySiteId(id:string){
  return this.http.get(`Building/Getbuildingsbysites?SiteId=${id}`)
}

getFloorsByBuildingId(id:string){
  return this.http.get(`Floor/Getfloorbybuilding?BuildingId=${id}`)
}

getRoomsByFloorId(id: string){
  return this.http.get(`Room/Getroombyfloor?FloorId=${id}`);
}

getMovementRequest(id:string){
  return this.http.get(`AssetMovement/movement-details/${id}`)
}

assetMovementGetById(id:string){
  return this.http.get(`AssetMovement/${id}`)
}

}


