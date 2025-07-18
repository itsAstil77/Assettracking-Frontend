import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Asset } from '../../../services/asset/asset';
import { FormsModule } from '@angular/forms';
import { Custodian } from '../../../services/custodian/custodian';
import { Department } from '../../../services/department/department';
import { Company } from '../../../services/company/company';
import { AssetMovement } from '../../../services/asset-movement/asset-movement';
import { Alert } from '../../../services/alert/alert';


@Component({
  selector: 'app-create-asset-movement',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './create-asset-movement.html',
  styleUrl: './create-asset-movement.css'
})
export class CreateAssetMovement implements OnInit {

  constructor(private assetService: Asset, private cdr: ChangeDetectorRef, private custodianService: Custodian,
    private departmentService: Department, private companyService: Company, private assetMovementService:AssetMovement,
  private alertService:Alert,private router:Router) { }

  ngOnInit(): void {

    this.loadAsset();
    this.loadDepartments();
    this.loadCustodians();
    this.loadCompany();
  }

  assetList: any[] = [];

  loadAsset() {
    this.assetService.GetAsset().subscribe({
      next: (res: any) => {
        this.assetList = res;
        this.cdr.detectChanges();
      },
    })
  }

  departmentList: any[] = [];
  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res) => {
        this.departmentList = res;
        this.cdr.detectChanges();

      },
      error: () => console.log('Failed to load departments')
    });
  }


  custodianList: any[] = [];
  loadCustodians(): void {
    this.custodianService.getCustodians().subscribe({
      next: (res) => {
        this.custodianList = res;
        this.cdr.detectChanges();
      },
      error: () => console.log('Failed to load custodians')
    });
  }

  companyList: any[] = [];

  loadCompany() {
    this.companyService.getCompany().subscribe({
      next: (res: any) => {
        this.companyList = res;
      },
      error: () => {
        console.log("error loading company")
      }
    })
  }

  siteList: any[] = []

  // getSiteByCompanyId(companyId: string) {
  //   this.assetService.getSiteByCompanyId(companyId).subscribe({
  //     next: (res: any) => {
  //       this.siteList = res;
  //     },
  //     error: (err) => console.error('Error loading sites:', err)
  //   });
  // }

onCompanyChange() {
  const selectedCompanyName = this.assetMovement.company;

  if (selectedCompanyName) {
    this.assetService.getSiteByCompanyId(selectedCompanyName).subscribe({
      next: (res: any) => this.siteList = res,
      error: (err) => console.error('Error fetching sites:', err),
    });
  } else {
    console.warn('No company selected');
  }
}





  selectAll: boolean = false;

  toggleAllAssets() {
    this.assetList.forEach(asset => asset.selected = this.selectAll);
  }

  toggleAsset(asset: any): void {
    asset.selected = !asset.selected;
  }


  assetMovement = {
    id:"",
    assetcode: '',
    company: '',
    site: '',
    building: '',
    floor: '',
    room: '',
    department: '',
    custodian: '',
    movedDate: '',
    movedBy: '',
    approvalworkflow: '',
    nextapprovalworkflow: '',
    lastapprovalworkflow: '',
    status: ''
  };



  onSave() {
    console.log(this.assetMovement);
    // API call here
  }

  onCancel() {
    this.assetMovement = {
      id:"",
      assetcode: '',
      company: '',
      site: '',
      building: '',
      floor: '',
      room: '',
      department: '',
      custodian: '',
      movedDate: '',
      movedBy: '',
      approvalworkflow: '',
      nextapprovalworkflow: '',
      lastapprovalworkflow: '',
      status: ''
    };
  }

createNewAssetMovement() {
    const selectedAssets = this.assetList.filter(asset => asset.selected);
    const payload = {
      ...this.assetMovement,
      assets: selectedAssets,
    };

    this.assetMovementService.createAssetMovement(payload).subscribe({
      next: (res:any) => {
         this.alertService.showAlert(res.message);
        this.router.navigate(['/asset-movement']); // 👈 Redirect here

      },
      error: (err) => {
        console.error('Save failed', err);
        this.alertService.showAlert('Error creating asset movement');
      }
    });
  }
}


