import { ChangeDetectorRef, Component } from '@angular/core';
import { Reports } from '../../../services/reports/reports';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssetMovementReports } from '../../../services/asset-movement-reports/asset-movement-reports';
import { Alert } from '../../../services/alert/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-movement-report',
  imports: [FormsModule, CommonModule],
  templateUrl: './asset-movement-report.html',
  styleUrl: './asset-movement-report.css'
})
export class AssetMovementReport {

  constructor(private reportService: Reports, private cdr: ChangeDetectorRef,
    private assetMovementreportService: AssetMovementReports, private alertService: Alert, private router: Router) { }

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


  assetReport = {
    fromGroup: [] as string[],
    fromCompany: [] as string[],
    fromSite: [] as string[],
    fromBuilding: [] as string[],
    fromFloor: [] as string[],
    fromRoom: [] as string[],
    toGroup: [] as string[],
    toCompany: [] as string[],
    toSite: [] as string[],
    toBuilding: [] as string[],
    toFloor: [] as string[],
    toRoom: [] as string[],
    fromDepartment: [] as string[],
    fromCustodian: [] as string[],
    toDepartment: [] as string[],
    toCustodian: [] as string[],
    startDate: '',
    endDate: ''
  };



  getAssetMovementReport() {
    const payload = this.buildApiPayload();
    this.assetMovementreportService.getAssetMovementReport(payload).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message);
        this.assetMovementreportService.setReportData(res);
        this.router.navigate(['/asset-movement-report-sum']);

      },
      error: (err) => {
        console.error('Error fetching report:', err);
      }
    });
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
      case 'fromGroup':
        const companies = this.companyMap[id] || [];
        companies.forEach(c => {
          this.pushIfNotExists(this.assetReport.fromCompany, c.id);
          this.autoSelectChildren(c.id, 'fromCompany');
        });
        break;
      case 'fromCompany':
        const sites = this.siteMap[id] || [];
        sites.forEach(s => {
          this.pushIfNotExists(this.assetReport.fromSite, s.id);
          this.autoSelectChildren(s.id, 'fromSite');
        });
        break;
      case 'fromSite':
        const buildings = this.buildingMap[id] || [];
        buildings.forEach(b => {
          this.pushIfNotExists(this.assetReport.fromBuilding, b.id);
          this.autoSelectChildren(b.id, 'fromBuilding');
        });
        break;
      case 'fromBuilding':
        const floors = this.floorMap[id] || [];
        floors.forEach(f => {
          this.pushIfNotExists(this.assetReport.fromFloor, f.id);
          this.autoSelectChildren(f.id, 'fromFloor');
        });
        break;
      case 'fromFloor':
        const rooms = this.roomMap[id] || [];
        rooms.forEach(r => this.pushIfNotExists(this.assetReport.fromRoom, r.id));
        break;
    }
  }

  autoDeselectChildren(id: string, type: string) {
    switch (type) {
      case 'fromGroup':
        const companies = this.companyMap[id] || [];
        companies.forEach(c => {
          this.assetReport.fromCompany = this.assetReport.fromCompany.filter(i => i !== c.id);
          this.autoDeselectChildren(c.id, 'fromCompany');
        });
        break;
      case 'fromCompany':
        const sites = this.siteMap[id] || [];
        sites.forEach(s => {
          this.assetReport.fromSite = this.assetReport.fromSite.filter(i => i !== s.id);
          this.autoDeselectChildren(s.id, 'fromSite');
        });
        break;
      case 'fromSite':
        const buildings = this.buildingMap[id] || [];
        buildings.forEach(b => {
          this.assetReport.fromBuilding = this.assetReport.fromBuilding.filter(i => i !== b.id);
          this.autoDeselectChildren(b.id, 'fromBuilding');
        });
        break;
      case 'fromBuilding':
        const floors = this.floorMap[id] || [];
        floors.forEach(f => {
          this.assetReport.fromFloor = this.assetReport.fromFloor.filter(i => i !== f.id);
          this.autoDeselectChildren(f.id, 'fromFloor');
        });
        break;
      case 'fromFloor':
        const rooms = this.roomMap[id] || [];
        rooms.forEach(r => this.assetReport.fromRoom = this.assetReport.fromRoom.filter(i => i !== r.id));
        break;
    }
  }

  pushIfNotExists(arr: string[], id: string) {
    if (!arr.includes(id)) {
      arr.push(id);
    }
  }


  get fromLocationLabel(): string {
    if (this.assetReport.fromRoom.length > 0) {
      const room = this.findById(this.roomMap, this.assetReport.fromRoom[0]);
      return room?.roomName;
    } else if (this.assetReport.fromFloor.length > 0) {
      const floor = this.findById(this.floorMap, this.assetReport.fromFloor[0]);
      return floor?.floorName;
    } else if (this.assetReport.fromBuilding.length > 0) {
      const building = this.findById(this.buildingMap, this.assetReport.fromBuilding[0]);
      return building?.buildingName;
    } else if (this.assetReport.fromSite.length > 0) {
      const site = this.findById(this.siteMap, this.assetReport.fromSite[0]);
      return site?.siteName;
    } else if (this.assetReport.fromCompany.length > 0) {
      const company = this.findById(this.companyMap, this.assetReport.fromCompany[0]);
      return company?.companyName;
    } else if (this.assetReport.fromGroup.length > 0) {
      const group = this.groupList.find(g => g.id === this.assetReport.fromGroup[0]);
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



  autoSelectChildrenTo(id: string, type: string) {
    switch (type) {
      case 'toGroup':
        const companies = this.companyMap[id] || [];
        companies.forEach(c => {
          this.pushIfNotExists(this.assetReport.toCompany, c.id);
          this.autoSelectChildrenTo(c.id, 'toCompany');
        });
        break;
      case 'toCompany':
        const sites = this.siteMap[id] || [];
        sites.forEach(s => {
          this.pushIfNotExists(this.assetReport.toSite, s.id);
          this.autoSelectChildrenTo(s.id, 'toSite');
        });
        break;
      case 'toSite':
        const buildings = this.buildingMap[id] || [];
        buildings.forEach(b => {
          this.pushIfNotExists(this.assetReport.toBuilding, b.id);
          this.autoSelectChildrenTo(b.id, 'toBuilding');
        });
        break;
      case 'toBuilding':
        const floors = this.floorMap[id] || [];
        floors.forEach(f => {
          this.pushIfNotExists(this.assetReport.toFloor, f.id);
          this.autoSelectChildrenTo(f.id, 'toFloor');
        });
        break;
      case 'toFloor':
        const rooms = this.roomMap[id] || [];
        rooms.forEach(r => this.pushIfNotExists(this.assetReport.toRoom, r.id));
        break;
    }
  }


  autoDeselectChildrenTo(id: string, type: string) {
    switch (type) {
      case 'toGroup':
        const companies = this.companyMap[id] || [];
        companies.forEach(c => {
          this.assetReport.toCompany = this.assetReport.toCompany.filter(i => i !== c.id);
          this.autoDeselectChildrenTo(c.id, 'toCompany');
        });
        break;
      case 'toCompany':
        const sites = this.siteMap[id] || [];
        sites.forEach(s => {
          this.assetReport.toSite = this.assetReport.toSite.filter(i => i !== s.id);
          this.autoDeselectChildrenTo(s.id, 'toSite');
        });
        break;
      case 'toSite':
        const buildings = this.buildingMap[id] || [];
        buildings.forEach(b => {
          this.assetReport.toBuilding = this.assetReport.toBuilding.filter(i => i !== b.id);
          this.autoDeselectChildrenTo(b.id, 'toBuilding');
        });
        break;
      case 'toBuilding':
        const floors = this.floorMap[id] || [];
        floors.forEach(f => {
          this.assetReport.toFloor = this.assetReport.toFloor.filter(i => i !== f.id);
          this.autoDeselectChildrenTo(f.id, 'toFloor');
        });
        break;
      case 'toFloor':
        const rooms = this.roomMap[id] || [];
        rooms.forEach(r => {
          this.assetReport.toRoom = this.assetReport.toRoom.filter(i => i !== r.id);
        });
        break;
    }
  }

  get toLocationLabel(): string {
    if (this.assetReport.toRoom.length > 0) {
      const room = this.findById(this.roomMap, this.assetReport.toRoom[0]);
      return room?.roomName;
    } else if (this.assetReport.toFloor.length > 0) {
      const floor = this.findById(this.floorMap, this.assetReport.toFloor[0]);
      return floor?.floorName;
    } else if (this.assetReport.toBuilding.length > 0) {
      const building = this.findById(this.buildingMap, this.assetReport.toBuilding[0]);
      return building?.buildingName;
    } else if (this.assetReport.toSite.length > 0) {
      const site = this.findById(this.siteMap, this.assetReport.toSite[0]);
      return site?.siteName;
    } else if (this.assetReport.toCompany.length > 0) {
      const company = this.findById(this.companyMap, this.assetReport.toCompany[0]);
      return company?.companyName;
    } else if (this.assetReport.toGroup.length > 0) {
      const group = this.groupList.find(g => g.id === this.assetReport.toGroup[0]);
      return group?.groupName;
    }
    return '';
  }


  showFromDeptDropdown = false;
  showToDeptDropdown = false;
  showFromCustodianDropdown = false;
  showToCustodianDropdown = false;


  getNameById(map: any, id: string, key: string): string | null {
    for (const groupId in map) {
      const found = map[groupId]?.find((item: any) => item.id === id);
      if (found) return found[key];
    }
    return null;
  }


  buildApiPayload() {
    const payload = {
      fromGroup: this.assetReport.fromGroup.map(id => {
        const group = this.groupList.find(g => g.id === id);
        return group?.groupName || id;
      }),
      fromCompany: this.assetReport.fromCompany.map(id => this.getNameById(this.companyMap, id, 'companyName') || id),
      fromSite: this.assetReport.fromSite.map(id => this.getNameById(this.siteMap, id, 'siteName') || id),
      fromBuilding: this.assetReport.fromBuilding.map(id => this.getNameById(this.buildingMap, id, 'buildingName') || id),
      fromFloor: this.assetReport.fromFloor.map(id => this.getNameById(this.floorMap, id, 'floorName') || id),
      fromRoom: this.assetReport.fromRoom.map(id => this.getNameById(this.roomMap, id, 'roomName') || id),

      toGroup: this.assetReport.toGroup.map(id => {
        const group = this.groupList.find(g => g.id === id);
        return group?.groupName || id;
      }),
      toCompany: this.assetReport.toCompany.map(id => this.getNameById(this.companyMap, id, 'companyName') || id),
      toSite: this.assetReport.toSite.map(id => this.getNameById(this.siteMap, id, 'siteName') || id),
      toBuilding: this.assetReport.toBuilding.map(id => this.getNameById(this.buildingMap, id, 'buildingName') || id),
      toFloor: this.assetReport.toFloor.map(id => this.getNameById(this.floorMap, id, 'floorName') || id),
      toRoom: this.assetReport.toRoom.map(id => this.getNameById(this.roomMap, id, 'roomName') || id),

      fromDepartment: [...this.assetReport.fromDepartment],
      fromCustodian: [...this.assetReport.fromCustodian],
      toDepartment: [...this.assetReport.toDepartment],
      toCustodian: [...this.assetReport.toCustodian],

      startDate: this.assetReport.startDate,
      endDate: this.assetReport.endDate,
    };

    return payload;
  }




}
