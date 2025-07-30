
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reports } from '../../../services/reports/reports';
import { AssetMovement } from '../../../services/asset-movement/asset-movement';
import { Masters } from '../../../services/masters/masters';
import { Alert } from '../../../services/alert/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  imports: [FormsModule, CommonModule],
  templateUrl: './report.html',
  styleUrl: './report.css'
})
export class Report implements OnInit {

  constructor(private reportService: Reports, private cdr: ChangeDetectorRef, private alertService: Alert,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadDepartment();
    this.loadCustodian();
    this.loadGroups();
  }


  departmentList: any[] = [];

  loadDepartment() {
    this.reportService.getDepartment().subscribe({
      next: (res: any) => {
        this.departmentList = res;
        this.cdr.detectChanges();
      }
    })

  }
  custodianList: any[] = [];

  loadCustodian() {
    this.reportService.getCustodian().subscribe({
      next: (res: any) => {
        this.custodianList = res;
        this.cdr.detectChanges();
      }
    })
  }

  groupList: any[] = [];

  loadGroups() {
    this.reportService.getGroup().subscribe({
      next: (res: any) => {
        this.groupList = res;
        this.cdr.detectChanges();
      },
      error: () => {
        console.log("error loading company")
      }
    })
  }

  assetReport = {
    groupName: [] as string[],
    companyName: [] as string[],
    siteName: [] as string[],
    buildingName: [] as string[],
    floorName: [] as string[],
    roomName: [] as string[],
    mainCategory: [] as string[],
    subCategory: [] as string[],
    subSubCategory: [] as string[],
    department: [] as string[],
    custodian: [] as string[],
  }



  createAssetReport() {
    const payload = this.buildApiPayload();
    this.reportService.getAssetReport(payload).subscribe({
      next: (res: any) => {
        this.alertService.showAlert("asset report generated successfully");
        this.reportService.setReportData(res);
        this.router.navigate(['/asset-report-sum']);
      },
      error: (err) => {
        this.alertService.showAlert('Error creating asset Report');
      }
    })
  }


  companyMap: { [groupId: string]: any[] } = {};
  siteMap: { [companyId: string]: any[] } = {};
  buildingMap: { [siteId: string]: any[] } = {};
  floorMap: { [buildingId: string]: any[] } = {};
  roomMap: { [floorId: string]: any[] } = {};

  expandedGroupId: string | null = null;
  expandedCompanyId: string | null = null;
  expandedSiteId: string | null = null;
  expandedBuildingId: string | null = null;
  expandedFloorId: string | null = null;


  dropdownOpenTo = false;
  dropdownOpenFrom = false;


  toggleDropdown(groupId: string): void {
    this.expandedGroupId = this.expandedGroupId === groupId ? null : groupId;
    if (this.expandedGroupId) {
      this.reportService.getCompaniesByGroup(groupId).subscribe((res: any[]) => {
        this.companyMap[groupId] = res;
      });
    }
  }

  toggleCompany(companyId: string): void {
    this.expandedCompanyId = this.expandedCompanyId === companyId ? null : companyId;
    if (this.expandedCompanyId) {
      this.reportService.getSitesByCompany(companyId).subscribe((res: any[]) => {
        this.siteMap[companyId] = res;
      });
    }
  }

  toggleSite(siteId: string): void {
    this.expandedSiteId = this.expandedSiteId === siteId ? null : siteId;
    if (this.expandedSiteId) {
      this.reportService.getBuildingsBySite(siteId).subscribe((res: any[]) => {
        this.buildingMap[siteId] = res;
      });
    }
  }

  toggleBuilding(buildingId: string): void {
    this.expandedBuildingId = this.expandedBuildingId === buildingId ? null : buildingId;
    if (this.expandedBuildingId) {
      this.reportService.getFloorsByBuilding(buildingId).subscribe((res: any[]) => {
        this.floorMap[buildingId] = res;
      });
    }
  }

  toggleFloor(floorId: string): void {
    this.expandedFloorId = this.expandedFloorId === floorId ? null : floorId;
    if (this.expandedFloorId) {
      this.reportService.getRoomsByFloor(floorId).subscribe((res: any[]) => {
        this.roomMap[floorId] = res;
      });
    }
  }


  onCheckboxChange(event: Event, id: string, key: keyof typeof this.assetReport) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const list = this.assetReport[key] as string[];

    if (isChecked && !list.includes(id)) {
      list.push(id);
    } else if (!isChecked) {
      const index = list.indexOf(id);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }
  }


  autoSelectChildren(id: string, type: string) {
    switch (type) {
      case 'groupName':
        const companies = this.companyMap[id] || [];
        companies.forEach(c => {
          this.pushIfNotExists(this.assetReport.companyName, c.id);
          this.autoSelectChildren(c.id, 'companyName');
        });
        break;
      case 'companyName':
        const sites = this.siteMap[id] || [];
        sites.forEach(s => {
          this.pushIfNotExists(this.assetReport.siteName, s.id);
          this.autoSelectChildren(s.id, 'siteName');
        });
        break;
      case 'siteName':
        const buildings = this.buildingMap[id] || [];
        buildings.forEach(b => {
          this.pushIfNotExists(this.assetReport.buildingName, b.id);
          this.autoSelectChildren(b.id, 'buildingName');
        });
        break;
      case 'buildingName':
        const floors = this.floorMap[id] || [];
        floors.forEach(f => {
          this.pushIfNotExists(this.assetReport.floorName, f.id);
          this.autoSelectChildren(f.id, 'floorName');
        });
        break;
      case 'floorName':
        const rooms = this.roomMap[id] || [];
        rooms.forEach(r => this.pushIfNotExists(this.assetReport.roomName, r.id));
        break;
    }
  }

  autoDeselectChildren(id: string, type: string) {
    switch (type) {
      case 'groupName':
        const companies = this.companyMap[id] || [];
        companies.forEach(c => {
          this.assetReport.companyName = this.assetReport.companyName.filter(i => i !== c.id);
          this.autoDeselectChildren(c.id, 'companyName');
        });
        break;
      case 'companyName':
        const sites = this.siteMap[id] || [];
        sites.forEach(s => {
          this.assetReport.siteName = this.assetReport.siteName.filter(i => i !== s.id);
          this.autoDeselectChildren(s.id, 'siteName');
        });
        break;
      case 'siteName':
        const buildings = this.buildingMap[id] || [];
        buildings.forEach(b => {
          this.assetReport.buildingName = this.assetReport.buildingName.filter(i => i !== b.id);
          this.autoDeselectChildren(b.id, 'buildingName');
        });
        break;
      case 'buildingName':
        const floors = this.floorMap[id] || [];
        floors.forEach(f => {
          this.assetReport.floorName = this.assetReport.floorName.filter(i => i !== f.id);
          this.autoDeselectChildren(f.id, 'floorName');
        });
        break;
      case 'floorName':
        const rooms = this.roomMap[id] || [];
        rooms.forEach(r => this.assetReport.floorName = this.assetReport.floorName.filter(i => i !== r.id));
        break;
    }
  }

  pushIfNotExists(arr: string[], id: string) {
    if (!arr.includes(id)) {
      arr.push(id);
    }
  }


  get fromLocationLabel(): string {
    if (this.assetReport.roomName.length > 0) {
      const room = this.findById(this.roomMap, this.assetReport.roomName[0]);
      return room?.roomName;
    } else if (this.assetReport.floorName.length > 0) {
      const floor = this.findById(this.floorMap, this.assetReport.floorName[0]);
      return floor?.floorName;
    } else if (this.assetReport.buildingName.length > 0) {
      const building = this.findById(this.buildingMap, this.assetReport.buildingName[0]);
      return building?.buildingName;
    } else if (this.assetReport.siteName.length > 0) {
      const site = this.findById(this.siteMap, this.assetReport.siteName[0]);
      return site?.siteName;
    } else if (this.assetReport.companyName.length > 0) {
      const company = this.findById(this.companyMap, this.assetReport.companyName[0]);
      return company?.companyName;
    } else if (this.assetReport.groupName.length > 0) {
      const group = this.groupList.find(g => g.id === this.assetReport.groupName[0]);
      return group?.groupName;
    }
    return '';
  }

  findById(map: any, id: string): any {
    for (let key in map) {
      const found = map[key]?.find((item: any) => item.id === id);
      if (found) return found;
    }
    return null;
  }




  showFromDeptDropdown = false;
  showFromCustodianDropdown = false;




  getNameById(map: any, id: string, key: string): string {
    for (const groupKey in map) {
      const found = map[groupKey]?.find((item: any) => item.id === id);
      if (found && found[key]) return found[key];
    }
    return id; // fallback to ID if not found
  }



  buildApiPayload() {
    const payload = {
      groupName: this.assetReport.groupName.map(id => {
        const group = this.groupList.find(g => g.id === id);
        return group?.groupName || id;
      }),
      companyName: this.assetReport.companyName.map(id => this.getNameById(this.companyMap, id, 'companyName') || id),
      siteName: this.assetReport.siteName.map(id => this.getNameById(this.siteMap, id, 'siteName') || id),
      buildingName: this.assetReport.buildingName.map(id => this.getNameById(this.buildingMap, id, 'buildingName') || id),
      floorName: this.assetReport.floorName.map(id => this.getNameById(this.floorMap, id, 'floorName') || id),
      roomName: this.assetReport.roomName.map(id => this.getNameById(this.roomMap, id, 'roomName') || id),

      mainCategory: this.assetReport.mainCategory.map(id =>
        this.getNameById(this.mainCategoryMap, id, 'categoryName') || id
      ),
      subCategory: this.assetReport.subCategory.map(id =>
        this.getNameById(this.subCategoryMap, id, 'categoryName') || id
      ),
      subSubCategory: this.assetReport.subSubCategory.map(id =>
        this.getNameById(this.subSubCategoryMap, id, 'categoryName') || id
      ),



      department: [...this.assetReport.department],
      custodian: [...this.assetReport.custodian],

    };

    return payload;
  }


  dropdownOpenCategory = false;

  expandedCategoryGroupId: string | null = null;
  expandedMainCategoryId: string | null = null;
  expandedSubCategoryId: string | null = null;

  mainCategoryMap: { [groupId: string]: any[] } = {};
  subCategoryMap: { [mainId: string]: any[] } = {};
  subSubCategoryMap: { [subId: string]: any[] } = {};


  get fromCategoryLabel(): string {
    if (this.assetReport.subSubCategory.length > 0) {
      return this.getNameById(this.subSubCategoryMap, this.assetReport.subSubCategory[0], 'categoryName') || '';
    } else if (this.assetReport.subCategory.length > 0) {
      return this.getNameById(this.subCategoryMap, this.assetReport.subCategory[0], 'categoryName') || '';
    } else if (this.assetReport.mainCategory.length > 0) {
      return this.getNameById(this.mainCategoryMap, this.assetReport.mainCategory[0], 'categoryName') || '';
    }
    return '';
  }


  toggleMainCategory(groupId: string): void {
    this.expandedCategoryGroupId = this.expandedCategoryGroupId === groupId ? null : groupId;
    if (this.expandedCategoryGroupId) {
      this.reportService.getMainCategoryByGroupId(groupId).subscribe(res => {
        this.mainCategoryMap[groupId] = res;
      });
    }
  }

  toggleSubCategory(mainCategoryId: string): void {
    this.expandedMainCategoryId = this.expandedMainCategoryId === mainCategoryId ? null : mainCategoryId;
    if (this.expandedMainCategoryId) {
      this.reportService.getSubCategoriesByMainCategory(mainCategoryId).subscribe(res => {
        this.subCategoryMap[mainCategoryId] = res;
      });
    }
  }

  toggleSubSubCategory(subCategoryId: string): void {
    this.expandedSubCategoryId = this.expandedSubCategoryId === subCategoryId ? null : subCategoryId;
    if (this.expandedSubCategoryId) {
      this.reportService.getSubSubCategoriesBySubCategoryId(subCategoryId).subscribe(res => {
        this.subSubCategoryMap[subCategoryId] = res;
      });
    }
  }



}










