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


export const routes: Routes = [


    { path: '', 
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
      {path:'create-asset-movement',component:CreateAssetMovement},
      {path:'asset-movement',component:AssetMovement},
      {path:'asset-disposal',component:AssetDisposal}

     
]}
];
