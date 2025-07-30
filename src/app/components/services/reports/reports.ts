import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Reports {

  constructor(private http: HttpClient) { }

  getDepartment() {
    return this.http.get('Department/summary')
  }

  getCustodian() {
    return this.http.get('Custodian/summary')
  }

  getGroup() {
    return this.http.get('Group/summary')
  }



  getCompaniesByGroup(id: string) {
    return this.http.get<any[]>(`companies/company-summary?GroupId=${id}`);
  }

  getSitesByCompany(id: string) {
    return this.http.get<any[]>(`sites/Getsitesbycompany?CompanyId=${id}`);
  }

  getBuildingsBySite(id: string) {
    return this.http.get<any[]>(`Building/Getbuildingsbysites?SiteId=${id}`);
  }

  getFloorsByBuilding(id: string) {
    return this.http.get<any[]>(`Floor/Getfloorbybuilding?BuildingId=${id}`);
  }

  getRoomsByFloor(id: string) {
    return this.http.get<any[]>(`Room/Getroombyfloor?FloorId=${id}`);
  }

  getAssetReport(payload: any) {
    return this.http.post('reports/assets/filter', payload)
  }



  getSubCategoriesByMainCategory(mainCategoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`SubCategory/Getsubcategorybymaincategory?id=${mainCategoryId}`);
  }

  getSubSubCategoriesBySubCategoryId(subCategoryId: string) {
    return this.http.get<any[]>(`SubSubCategory/GetSubsubcategorybysubcategory?id=${subCategoryId}`);
  }

  getMainCategoryByGroupId(groupId: string): Observable<any[]> {
    return this.http.get<any[]>(`MainCategory/GetMainCategorybygroup?id=${groupId}`);
  }

  private reportData: any[] = [];

  setReportData(data: any[]) {
    this.reportData = data;
  }

  getReportData() {
    return this.reportData;
  }

}
