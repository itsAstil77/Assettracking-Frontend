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
import { Masters } from '../../../services/masters/masters';


@Component({
  selector: 'app-create-asset-movement',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './create-asset-movement.html',
  styleUrl: './create-asset-movement.css'
})
export class CreateAssetMovement implements OnInit {

  constructor(private assetService: Asset, private cdr: ChangeDetectorRef, private custodianService: Custodian,
    private departmentService: Department, private companyService: Company, private assetMovementService: AssetMovement,
    private alertService: Alert, private router: Router,private masterService:Masters) { }

  ngOnInit(): void {

    this.loadAsset();
    this.loadDepartments();
    this.loadCustodians();
    this.loadGroups();
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

  groupList: any[] = [];

  loadGroups() {
    this.masterService.getGroups().subscribe({
      next: (res: any) => {
        this.groupList = res;
        this.cdr.detectChanges();
      },
      error: () => {
        console.log("error loading company")
      }
    })
  }




  // onCompanyChange() {
  //   const selectedCompanyName = this.assetMovement.company;

  //   if (selectedCompanyName) {
  //     this.assetService.getSiteByCompanyId(selectedCompanyName).subscribe({
  //       next: (res: any) => this.siteList = res,
  //       error: (err) => console.error('Error fetching sites:', err),
  //     });
  //   } else {
  //     console.warn('No company selected');
  //   }
  // }





  selectAll: boolean = false;

  toggleAllAssets() {
    this.assetList.forEach(asset => asset.selected = this.selectAll);
  }

  toggleAsset(asset: any): void {
    asset.selected = !asset.selected;
  }


 assetMovement = {
  id: '',
  assetcode: '',
  group: '',
  company: '',
  site: '',
  building: '',
  floor: '',
  room: '',
  department: '',
  custodian: '',
  requestDate: '',
  referenceNumber: '',
  movedDate: '',
  movedBy: '',
  approvalworkflow: '',
  nextapprovalworkflow: '',
  lastapprovalworkflow: '',
  status: '',
  imageBase64: '',
  remarks: '',
  assets: [],
  approvalSummary: [
    {
      status: '',
      requestApprovedBy: '',
      requestApprovedDate: '',
      remarks: ''
    }
  ]
};


  // createNewAssetMovement() {
  //   const selectedAssets = this.assetList.filter(asset => asset.selected);
  //   const payload = {
  //     ...this.assetMovement,
  //     assets: selectedAssets,
  //   };

  //   this.assetMovementService.createAssetMovement(payload).subscribe({
  //     next: (res: any) => {
  //       this.alertService.showAlert(res.message);
  //       this.router.navigate(['/asset-movement']); // 👈 Redirect here

  //     },
  //     error: (err) => {
  //       console.error('Save failed', err);
  //       this.alertService.showAlert('Error creating asset movement');
  //     }
  //   });
  // }


  createNewAssetMovement() {
  const selectedAssets = this.assetList.filter(asset => asset.selected);

  const payload = {
    ...this.assetMovement,

    assets: selectedAssets,
    approvalSummary: [
      {
        status: this.assetMovement.approvalSummary?.[0]?.status || '',
        requestApprovedBy: this.assetMovement.approvalSummary?.[0]?.requestApprovedBy || '',
        // Set to ISO string only if valid Date, otherwise null
        requestApprovedDate: this.assetMovement.approvalSummary?.[0]?.requestApprovedDate
          ? new Date(this.assetMovement.approvalSummary[0].requestApprovedDate).toISOString()
          : null,
        remarks: this.assetMovement.approvalSummary?.[0]?.remarks || ''
      }
    ]
  };

  this.assetMovementService.createAssetMovement(payload).subscribe({
    next: (res: any) => {
      this.alertService.showAlert(res.message);
      this.router.navigate(['/asset-movement']);
    },
    error: (err) => {
      console.error('Save failed', err);
      this.alertService.showAlert('Error creating asset movement');
    }
  });
}


  companyList:any[]=[];

    onGroupChange(groupId: string): void {
    const selectedGroup = this.groupList.find(group => group.id === groupId);
    this.assetMovement.group = selectedGroup?.groupName;

    this.assetMovementService.getSitesByGroupId(groupId).subscribe({
      next: (res: any) => {
        this.companyList = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching company:', err);
      }
    });
  }


  siteList: any[] = [];

  onCompanyChange(companyId: string): void {
    const selectedCompany = this.companyList.find(comp => comp.id === companyId);
    this.assetMovement.company = selectedCompany?.companyName;

    this.assetMovementService.getSitesByCompanyId(companyId).subscribe({
      next: (res: any) => {
        this.siteList = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching sites:', err);
      }
    });
  }

  buildingList: any[] = [];

  onSiteChange(siteId: string): void {
    const selectedSite = this.siteList.find(site => site.id === siteId);
    this.assetMovement.site = selectedSite.siteName;

    this.assetMovementService.getBuildingsBySiteId(siteId).subscribe({
      next: (res: any) => {
        this.buildingList = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching buildings:', err);
      }
    });
  }

  floorList: any[] = [];


  onBuildingChange(buildingId: string): void {
    const selectedBuilding = this.buildingList.find(building => building.id === buildingId);
    this.assetMovement.building = selectedBuilding.buildingName;

    this.assetMovementService.getFloorsByBuildingId(buildingId).subscribe({
      next: (res: any) => {
        this.floorList = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching floors:', err);
      }
    });
  }

  roomList: any[] = [];
  onFloorChange(floorId: string): void {
    const selectedFloor = this.floorList.find(floor => floor.id === floorId);
    this.assetMovement.floor = selectedFloor.floorName;

    this.assetMovementService.getRoomsByFloorId(floorId).subscribe({
      next: (res: any) => {
        this.roomList = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });
  }





}


