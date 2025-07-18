import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Asset {

  constructor(private http: HttpClient) { }

  createAsset(asset: any) {
    return this.http.post('Asset/add', asset)
  }

  GetAsset(){
    return this.http.get('Asset/summary')
  }

  getCompanyByGroupId(group: string){
    return this.http.get(`companies/company-summary?GroupId=${group}`)
  }

  getSiteByCompanyId(companyName: string) {
    return this.http.get(`sites/Getsitesbycompany?CompanyId=${companyName}`);
  }
  getBuildingBySiteId(siteName: string) {
    return this.http.get(`Building/Getbuildingsbysites?SiteId=${siteName}`);
  }

  getFloorByBuildingId(buildingName: string) {
    return this.http.get(`Floor/Getfloorbybuilding?BuildingId=${buildingName}`);
  }

  getRoomByFloorId(floor: string) {
    return this.http.get(`Room/Getroombyfloor?FloorId=${floor}`);
  }

  getMainCategoryByGroupId(mainCategory: string) {
    return this.http.get(`MainCategory/GetMainCategorybygroup?id=${mainCategory}`);
  }


  getSubCategoryByMainCategoryId(subCategory: string) {
    return this.http.get(`SubCategory/Getsubcategorybymaincategory?id=${subCategory}`);
  }

  getSubSubCategoryBySubCategoryId(subSubCategory: string) {
    return this.http.get(`SubSubCategory/GetSubsubcategorybysubcategory?id=${subSubCategory}`);
  }

  getBrandBySubSubCategoryId(brand: string) {
    return this.http.get(`Brand/getbrandbysubsubcategory?id=${brand}`);
  }

  getModelByBrandId(model: string) {
    return this.http.get(`Model/getmodelbybrand?id=${model}`);
  }

  updateAsset(id: string, data: any) {
  return this.http.put(`Asset/update/${id}`, data);
}

deleteAsset(id: string) {
  return this.http.delete(`Asset/delete/${id}`);
}



   getAssetMovementSummary(page: number, pageSize: number) {
    return this.http.get<any>(`AssetMovement/ Assetmovementsummary?page=${page}&pageSize=${pageSize}`);
  }

}
