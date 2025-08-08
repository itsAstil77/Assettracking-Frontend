import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkin } from '../../../services/checkin/checkin';
import { CommonModule } from '@angular/common';
import { Alert } from '../../../services/alert/alert';

@Component({
  selector: 'app-asset-checkin',
  imports: [FormsModule, CommonModule],
  templateUrl: './asset-checkin.html',
  styleUrl: './asset-checkin.css'
})
export class AssetCheckin implements OnInit {

  constructor(private checkinService: Checkin, private cdr: ChangeDetectorRef, private alertService: Alert) { }

  custodianList: any[] = [];
  selectedCustodian: string = '';

  ngOnInit() {
    this.loadCustodian();
    this.loadDepartment();
    this.loadCompany();
  }


  selectAll: boolean = false;

  toggleAllAssets() {
    this.assetsList.forEach(asset => asset.selected = this.selectAll);
  }

  toggleAsset(asset: any): void {
    asset.selected = !asset.selected;
  }

  loadCustodian() {
    this.checkinService.getAllCustodian().subscribe({
      next: (res: any) => {
        console.log('Custodian Response:', res);
        this.custodianList = res;
      },
      error: (err) => {
        console.error('Error loading custodians:', err);
      }
    });
  }

  assetsList: any[] = [];

  onCustodianChange(assetName: string) {
    this.checkinService.getAssetByName(assetName).subscribe({
      next: (res: any) => {
        this.assetsList = res;
        this.cdr.detectChanges()

      }
    })
  }

  departmentList: any[] = [];

  loadDepartment() {
    this.checkinService.getDepartment().subscribe({
      next: (res: any) => {
        this.departmentList = res;
        this.cdr.detectChanges();

      }
    })
  }

  assetCheckIn = {
    id: '',
    oldCustodian: '',
    assets: [],
    newcustodian: '',
    department: '',
    companyName: '',
    siteName: '',
    buildingName: '',
    floorName: '',
    roomName: '',
    duedate: '',
    remarks: ''
  }

  companyList: any[] = [];

  loadCompany() {
    this.checkinService.getCompany().subscribe({
      next: (res: any) => {
        this.companyList = res;
        this.cdr.detectChanges();

      }
    })
  }



selectedCompanyId: string = '';
selectedSiteId: string = '';
selectedBuildingId: string = '';
selectedFloorId: string = '';

  siteList: any[] = [];

  onSiteChangeByCompanyId(companyId: string): void {


    this.checkinService.getSiteByCompanyId(companyId).subscribe({
      next: (res: any) => {
        this.siteList = res;
        this.cdr.detectChanges();

        const selectedCompany = this.companyList.find(comp => comp.id === companyId);
        this.assetCheckIn.companyName = selectedCompany ? selectedCompany.companyName:'';
        
      },
      error: (err) => {
        console.error('Error fetching sites:', err);
      }
    });
  }

  buildingList: any[] = [];

  onSiteChange(siteId: string): void {


    this.checkinService.getBuildingBySiteId(siteId).subscribe({
      next: (res: any) => {
        this.buildingList = res;
        this.cdr.detectChanges();

        const selectedSite = this.siteList.find(site => site.id === siteId);
        this.assetCheckIn.siteName = selectedSite ? selectedSite.siteName : ''
      },
      error: (err) => {
        console.error('Error fetching buildings:', err);
      }
    });
  }

  floorList: any[] = [];


  onBuildingChange(buildingId: string): void {

    this.checkinService.getFloorByBuildingId(buildingId).subscribe({
      next: (res: any) => {
        this.floorList = res;
        this.cdr.detectChanges();

        const selectedBuilding = this.buildingList.find(building => building.id === buildingId);
        this.assetCheckIn.buildingName= selectedBuilding.buildingName;

      },
      error: (err) => {
        console.error('Error fetching floors:', err);
      }
    });
  }

  roomList: any[] = [];
  onFloorChange(floorId: string): void {


    this.checkinService.getRoomByFloorId(floorId).subscribe({
      next: (res: any) => {
        this.roomList = res;
        this.cdr.detectChanges();
        const selectedFloor = this.floorList.find(floor => floor.id === floorId);
        this.assetCheckIn.floorName = selectedFloor.floorName;
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });
  }


  submitCheckin() {
    const selectedAssets = this.assetsList.filter(asset => asset.selected).map(asset => ({
      id: asset.id,
      assetCode: asset.assetCode,
      companyName: asset.companyName,
      siteName: asset.siteName,
      buildingName: asset.buildingName,
      floorName: asset.floorName,
      room: asset.room,
      department: asset.department,
      custodian: asset.custodian,
      sector: asset.sector,
      mainCategory: asset.mainCategory,
      subCategory: asset.subCategory,
      subSubCategory: asset.subSubCategory,
      group: asset.group,
      brand: asset.brand,
      model: asset.model,
      assetDescription: asset.assetDescription,
      referenceCode: asset.referenceCode,
      quantity: asset.quantity,
      assetStatus: asset.assetStatus,
      assetCondition: asset.assetCondition,
      assetType: asset.assetType,
      purchaseCode: asset.purchaseCode
    }));

    const requestBody = {
      ...this.assetCheckIn,
      assets: selectedAssets,
      duedate: new Date().toISOString()
    };

    this.checkinService.submitCheckin(requestBody).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message, "success");
        this.reloadPage();

      },
      error: (err) => {
        this.alertService.showAlert(err.message, "error");
      }
    });
  }
  
  reloadPage() {
    window.location.reload();
  }
}


