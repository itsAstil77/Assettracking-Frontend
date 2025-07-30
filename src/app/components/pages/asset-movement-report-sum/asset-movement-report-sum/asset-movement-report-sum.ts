import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AssetMovementReports } from '../../../services/asset-movement-reports/asset-movement-reports';

@Component({
  selector: 'app-asset-movement-report-sum',
  imports: [RouterModule, CommonModule],
  templateUrl: './asset-movement-report-sum.html',
  styleUrl: './asset-movement-report-sum.css'
})
export class AssetMovementReportSum implements OnInit {

  constructor(private assetMovementreportService: AssetMovementReports) { }

  reportData: any[] = [];

  ngOnInit(): void {
    this.reportData = this.assetMovementreportService.getReportData();
  }


}
