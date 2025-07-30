import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Reports } from '../../../services/reports/reports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-report-sum',
  imports: [RouterModule,CommonModule],
  templateUrl: './asset-report-sum.html',
  styleUrl: './asset-report-sum.css'
})
export class AssetReportSum {

    constructor(private reportService: Reports) { }
  
    reportData: any[] = [];
  
    ngOnInit(): void {
      this.reportData = this.reportService.getReportData();
    }
  

}
