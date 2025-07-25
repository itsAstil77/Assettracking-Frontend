import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Checkin {

  constructor(private http:HttpClient) { }

  getAllCustodian(){
    return this.http.get('Custodian/summary')
  }

  getAssetByName(name:string){
    return this.http.get(`AssetCheckin/getassetbycustodian?name=${name}`)
  }

  getDepartment(){
    return this.http.get('Department/summary')
  }

  getCompany(){
    return this.http.get('companies')
  }

  getSiteByCompanyId(id:string){
    return this.http.get(`sites/Getsitesbycompany?CompanyId=${id}`)
  }

  getBuildingBySiteId(id:string){
    return this.http.get(`Building/Getbuildingsbysites?SiteId=${id}`)
  }

  getFloorByBuildingId(id:string){
    return this.http.get(`Floor/Getfloorbybuilding?BuildingId=${id}`)
  }

  getRoomByFloorId(id:string){
    return this.http.get(`Room/Getroombyfloor?FloorId=${id}`)
  }

  submitCheckin(data:any){
    return this.http.post('AssetCheckin',data)
  }

}
