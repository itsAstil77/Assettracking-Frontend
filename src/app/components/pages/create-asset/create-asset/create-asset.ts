import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Masters } from '../../../services/masters/masters';
import { Department } from '../../../services/department/department';
import { Custodian } from '../../../services/custodian/custodian';
import { Sector } from '../../../services/sector/sector';
import { Asset } from '../../../services/asset/asset';
import { AssetMovement } from '../../../services/asset-movement/asset-movement';
import { Alert } from '../../../services/alert/alert';
import { Supplier } from '../../../services/supplier/supplier';
import { Model } from '../../../services/model/model';

@Component({
  selector: 'app-create-asset',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './create-asset.html',
  styleUrl: './create-asset.css'
})
export class CreateAsset implements OnInit {

  ngOnInit(): void {
    this.loadGroups();
    this.loadDepartments();
    this.loadCustodians();
    this.loadSectors();
    this.loadSuppliers();
    this.loadModels();
  }

  constructor(private masterService: Masters, private departmentService: Department,
    private custodianService: Custodian, private sectorService: Sector, private cdr: ChangeDetectorRef, private assetService: Asset,
    private assetMovementService: AssetMovement, private router: Router, private alertService: Alert, private supplierService: Supplier,
  private modelService:Model) { }

  groupList: any[] = []

  loadGroups(): void {
    this.masterService.getGroups().subscribe({
      next: (data) => {
        this.groupList = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load groups', err);
      }
    });
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


  sectorList: any[] = [];

  loadSectors() {
    this.sectorService.getSectors().subscribe({
      next: (res: any) => {
        this.sectorList = res;
        this.cdr.detectChanges();
      },
      error: () => console.log('Failed to load sectors')
    });
  }

  supplierList: any[] = [];
  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (res) => {
        this.supplierList = res;
        this.cdr.detectChanges();
      },
      error: () => console.log('Failed to load suppliers')
    });
  }

  getModelList:any[]=[];
  loadModels(){
    this.modelService.getModel().subscribe({
      next:(res:any)=>{
        this.getModelList=res;
      }
    })
  }



  companyList: any[] = [];

  getCompanyByGroupId(group: string) {
    this.assetService.getCompanyByGroupId(group).subscribe({
      next: (res: any) => {
        this.companyList = res;

        // If newAsset.companyId is already selected, get the companyName
        const selectedCompany = this.companyList.find(
          c => c.id === this.newAsset.companyId
        );

        if (selectedCompany) {
          this.newAsset.companyName = selectedCompany.companyName;
        } else {
          this.newAsset.companyName = ''; // reset if not found
        }
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  mainCategoryList: any[] = [];

  getMainCategoryByGroupId(groupId: string) {
    this.assetService.getMainCategoryByGroupId(groupId).subscribe({
      next: (res: any) => {
        this.mainCategoryList = res;

        const selected = res.find((item: any) => item.id === this.newAsset.mainCategory);
        this.newAsset.mainCategory = selected ? selected.categoryName : '';
      }
    });
  }

  siteList: any[] = []
  getSiteByCompanyId(companyId: string) {
    this.assetService.getSiteByCompanyId(companyId).subscribe({
      next: (res: any) => {
        this.siteList = res;

        const selectedSite = this.siteList.find(site => site.id === this.newAsset.siteName);
        this.newAsset.siteName = selectedSite ? selectedSite.siteName : '';
      },
      error: (err) => console.error('Error loading sites:', err)
    });
  }

  buildingList: any[] = [];
  getBuildingBySiteId(siteId: string) {
    this.assetService.getBuildingBySiteId(siteId).subscribe({
      next: (res: any) => {
        this.buildingList = res;

        const selected = this.buildingList.find(b => b.id === this.newAsset.buildingName);
        this.newAsset.buildingName = selected ? selected.buildingName : '';
      }
    });
  }

  floorList: any[] = []
  getFloorByBuildingId(buildingId: string) {
    this.assetService.getFloorByBuildingId(buildingId).subscribe({
      next: (res: any) => {
        this.floorList = res;

        const selected = this.floorList.find(f => f.id === this.newAsset.floorName);
        this.newAsset.floorName = selected ? selected.floorName : '';
      }
    });
  }


  roomList: any[] = []
  getRoomByFloorId(floorId: string) {
    this.assetService.getRoomByFloorId(floorId).subscribe({
      next: (res: any) => {
        this.roomList = res;

        const selected = this.roomList.find(r => r.id === this.newAsset.room);
        this.newAsset.room = selected ? selected.roomName : '';
      }
    });
  }

  subCategoryList: any[] = [];

  getSubCategoryByMainCategoryId(mainCategoryId: string) {
    this.assetService.getSubCategoryByMainCategoryId(mainCategoryId).subscribe({
      next: (res: any) => {
        this.subCategoryList = res;

        const selected = res.find((item: any) => item.id === this.newAsset.subCategory);
        this.newAsset.subCategory = selected ? selected.categoryName : '';
      }
    });
  }


  subSubCategoryList: any[] = [];

  getSubSubCategoryBySubCategoryId(subCategoryId: string) {
    this.assetService.getSubSubCategoryBySubCategoryId(subCategoryId).subscribe({
      next: (res: any) => {
        this.subSubCategoryList = res;

        const selected = res.find((item: any) => item.id === this.newAsset.subSubCategory);
        this.newAsset.subSubCategory = selected ? selected.categoryName : '';
      }
    });
  }

  brandList: any[] = [];

  getBrandBySubSubCategoryId(subSubCategoryId: string) {
    this.assetService.getBrandBySubSubCategoryId(subSubCategoryId).subscribe({
      next: (res: any) => {
        this.brandList = res;

        const selected = res.find((item: any) => item.id === this.newAsset.brand);
        this.newAsset.brand = selected ? selected.categoryName : '';
      }
    });
  }

  modelList: any[] = [];

  getModelByBrandId(brandId: string) {
    this.assetService.getModelByBrandId(brandId).subscribe({
      next: (res: any) => {
        this.modelList = res;

        const selected = res.find((item: any) => item.model === this.newAsset.model);
        this.newAsset.model = selected ? selected.modelName : '';
      }
    });
  }


  selectedRole: string = 'Asset';


  isCreateAssetPopup: boolean = false;


  openCreateAssetPopup() {
    this.isCreateAssetPopup = true;
    this.loadGroups();
    this.loadDepartments();
    this.loadCustodians();
    this.loadSectors();

    this.newAsset = {
      id: "",
      assetCode: "",
      companyName: "",
      siteName: "",
      buildingName: "",
      floorName: "",
      room: "",
      group: "",
      brand: "",
      model: "",
      assetDescription: "",
      referenceCode: "",
      quantity: "",
      assetStatus: "",
      assetCondition: "",
      assetType: "",
      purchaseCode: ""
    }
  }

  closeCreateAssetPopup() {
    this.isCreateAssetPopup = false;
  }

  newAsset: any = {
    id: "",
    assetCode: "",
    companyName: "",
    siteName: "",
    buildingName: "",
    floorName: "",
    room: "",
    department: "",
    custodian: "",
    sector: "",
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
    group: "",
    brand: "",
    model: "",
    assetDescription: "",
    referenceCode: "",
    quantity: "",
    assetStatus: "",
    assetCondition: "",
    assetType: ""
  };

  createAsset() {
    // Replace IDs with names before sending to API

    const selectedCompany = this.companyList.find(c => c.id === this.newAsset.companyName);
    this.newAsset.companyName = selectedCompany?.companyName || '';

    const selectedGroup = this.groupList.find(g => g.id === this.newAsset.group);
    this.newAsset.group = selectedGroup?.groupName || '';

    const selectedSite = this.siteList.find(s => s.id === this.newAsset.siteName);
    this.newAsset.siteName = selectedSite?.siteName || '';

    const selectedBuilding = this.buildingList.find(b => b.id === this.newAsset.buildingName);
    this.newAsset.buildingName = selectedBuilding?.buildingName || '';

    const selectedFloor = this.floorList.find(f => f.id === this.newAsset.floorName);
    this.newAsset.floorName = selectedFloor?.floorName || '';

    const selectedMainCat = this.mainCategoryList.find(c => c.id === this.newAsset.mainCategory);
    this.newAsset.mainCategory = selectedMainCat?.categoryName || '';

    const selectedSubCat = this.subCategoryList.find(c => c.id === this.newAsset.subCategory);
    this.newAsset.subCategory = selectedSubCat?.categoryName || '';

    const selectedSubSubCat = this.subSubCategoryList.find(c => c.id === this.newAsset.subSubCategory);
    this.newAsset.subSubCategory = selectedSubSubCat?.categoryName || '';

    const selectedBrand = this.brandList.find(b => b.id === this.newAsset.brand);
    this.newAsset.brand = selectedBrand?.categoryName || '';

    const selectedModel = this.modelList.find(m => m.model === this.newAsset.model);
    this.newAsset.model = selectedModel?.modelName || '';

    this.assetService.createAsset(this.newAsset).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message, "success");
        this.isCreateAssetPopup = false;
        // this.loadAsset();
      },
      error: (err) => {
        this.alertService.showAlert(err.message, "error");
      }
    });
  }


  // purchase info 

  purchaseInfo = {
    id: '',
    purchaseCode: '',
    assetLife: '',
    unitPrice: '',
    poNumber: '',
    invoiceNumber: '',
    grnNumber: '',
    releaseNumber: '',
    supplier: '',
    deliveryDate: '',
    capitalizationDate: '',
    invoiceDate: '',
    poDate: '',
    serviceStartDate: '',
    serviceEndDate: '',
    warrantyStartDate: '',
    warrantyEndDate: ''
  };

  AdditionalInfo = {
    id: '',
    model: '',
    make:'',
    assetType: '',
  }

}
