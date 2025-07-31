import { Routes } from '@angular/router';
import { Login } from './components/pages/login/login/login';
import { Otp } from './components/pages/otp/otp/otp';
import { Navbar } from './components/navbar/navbar/navbar';
import { Dashboard } from './components/pages/dashboard/dashboard/dashboard';
import { Report } from './components/pages/report/report/report';
import { Master } from './components/pages/master/master/master';
import { Admin } from './components/pages/admin/admin/admin';
import { CreateAssetMovement } from './components/pages/create-asset-movement/create-asset-movement/create-asset-movement';
import { AssetMovement } from './components/pages/asset-movement/asset-movement/asset-movement';
import { AssetDisposal } from './components/pages/asset-disposal/asset-disposal/asset-disposal';
import { CreateAssetDisposal } from './components/pages/create-asset-disposal/create-asset-disposal/create-asset-disposal';
import { CreateAsset } from './components/pages/create-asset/create-asset/create-asset';
import { AssetMovementRequest } from './components/pages/asset-movement-request/asset-movement-request/asset-movement-request';
import { AssetDisposalRequest } from './components/pages/asset-disposal-request/asset-disposal-request/asset-disposal-request';
import { AssetCheckin } from './components/pages/asset-checkin/asset-checkin/asset-checkin';
import { AssetCheckout } from './components/pages/asset-checkout/asset-checkout/asset-checkout';
import { AssetAudit } from './components/pages/asset-audit/asset-audit/asset-audit';
import { CreateAssetAudit } from './components/pages/create-asset-audit/create-asset-audit/create-asset-audit';
import { AssetMovementReport } from './components/pages/asset-movement-report/asset-movement-report/asset-movement-report';
import { AssetMovementReportSum } from './components/pages/asset-movement-report-sum/asset-movement-report-sum/asset-movement-report-sum';
import { AssetReportSum } from './components/pages/asset-report-sum/asset-report-sum/asset-report-sum';
import { AssetAuditReport } from './components/pages/asset-audit-report/asset-audit-report/asset-audit-report';
import { AssetCatalogueReport } from './components/pages/asset-catalogue-report/asset-catalogue-report/asset-catalogue-report';
import { AssetCategoryReport } from './components/pages/asset-category-report/asset-category-report/asset-category-report';
import { AssetDepreciationReport } from './components/pages/asset-depreciation-report/asset-depreciation-report/asset-depreciation-report';
import { AssetDisposalReport } from './components/pages/asset-disposal-report/asset-disposal-report/asset-disposal-report';
import { AssetDofReport } from './components/pages/asset-dof-report/asset-dof-report/asset-dof-report';
import { AssetValueReport } from './components/pages/asset-value-report/asset-value-report/asset-value-report';
import { AuditLogs } from './components/pages/audit-logs/audit-logs/audit-logs';
import { InventoryReport } from './components/pages/inventory-report/inventory-report/inventory-report';
import { TaggedAssetReport } from './components/pages/tagged-asset-report/tagged-asset-report/tagged-asset-report';


export const routes: Routes = [


  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },

  {
    path: 'otp',
    component: Otp
  },

  {
    path: '',
    component: Navbar,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'report', component: Report },
      { path: 'master', component: Master },
      { path: 'admin', component: Admin },
      { path: 'create-asset-movement', component: CreateAssetMovement },
      { path: 'asset-movement', component: AssetMovement },
      { path: 'asset-disposal', component: AssetDisposal },
      { path: 'create-asset-disposal', component: CreateAssetDisposal },
      { path: 'create-asset', component: CreateAsset },
      { path: 'asset-movement-request/:id', component: AssetMovementRequest },
      { path: 'asset-disposal-request/:id', component: AssetDisposalRequest },
      { path: 'asset-checkin', component: AssetCheckin },
      { path: 'asset-checkout', component: AssetCheckout },
      { path: 'asset-audit', component: AssetAudit },
      { path: 'create-asset-audit', component: CreateAssetAudit },
      { path: 'asset-movement-report', component: AssetMovementReport },
      { path: 'asset-movement-report-sum', component: AssetMovementReportSum },
      { path: 'asset-report-sum', component: AssetReportSum },
      { path: 'asset-audit-report', component: AssetAuditReport },
      { path: 'asset-catalogue-report', component: AssetCatalogueReport },
      { path: 'asset-category-report', component: AssetCategoryReport },
      { path: 'asset-depreciation-report', component: AssetDepreciationReport },
      { path: 'asset-disposal-report', component: AssetDisposalReport },
      { path: 'asset-dof-report', component: AssetDofReport },
      { path: 'asset-value-report', component: AssetValueReport },
      { path: 'audit-logs', component: AuditLogs },
      { path: 'inventory-report', component: InventoryReport },
      { path: 'tagged-asset-report', component: TaggedAssetReport }



    ]
  }
];
