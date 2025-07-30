import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetMovementReports {

  constructor(private http: HttpClient) { }


  private reportData: any[] = [];

  setReportData(data: any[]) {
    this.reportData = data;
  }

  getReportData() {
    return this.reportData;
  }

  getAssetMovementReport(payload: any) {
    return this.http.post<any>(`AssetMovement/report`, payload);
  }

}
