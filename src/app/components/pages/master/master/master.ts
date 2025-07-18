import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Masters } from '../../../services/masters/masters';
import { CommonModule } from '@angular/common';
import { Department } from '../../../services/department/department';
import { Custodian } from '../../../services/custodian/custodian';
import { Sector } from '../../../services/sector/sector';
import { Supplier } from '../../../services/supplier/supplier';
import { FormsModule } from '@angular/forms';
import { Company } from '../../../services/company/company';
import { Category } from '../../../services/category/category';
import { Subcategory } from '../../../services/subcategory/subcategory';
import { Subsubcategory } from '../../../services/subsubcategory/subsubcategory';
import { Brand } from '../../../services/brand/brand';
import { Model } from '../../../services/model/model';
import { Alert } from '../../../services/alert/alert';
import { Asset } from '../../../services/asset/asset';




@Component({
  selector: 'app-master',
  imports: [CommonModule, FormsModule],
  templateUrl: './master.html',
  styleUrl: './master.css'
})
export class Master implements OnInit {


  ngOnInit(): void {
    this.loadGroups();
    this.loadDepartments();
    this.loadCustodians();
    this.loadSectors();
    this.loadSuppliers();
    this.loadAsset();


  }



  selectedRole: string = 'Group';
  groupList: any[] = [];

  constructor(private masterService: Masters, private departmentService: Department,
    private custodianService: Custodian, private sectorService: Sector, private supplierService: Supplier,
    private categoryService: Category, private companyService: Company, private subCategoryService: Subcategory,
    private subSubCategoryService: Subsubcategory, private brandService: Brand, private modelService: Model,
    private alertService: Alert, private assetService: Asset, private cdr: ChangeDetectorRef) { }




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
      error: () => alert('Failed to load departments')
    });
  }


  custodianList: any[] = [];
  loadCustodians(): void {
    this.custodianService.getCustodians().subscribe({
      next: (res) => {
        this.custodianList = res;
        this.cdr.detectChanges(); 
      },
      error: () => alert('Failed to load custodians')
    });
  }


  sectorList: any[] = [];

  loadSectors() {
    this.sectorService.getSectors().subscribe({
      next: (res: any) => {
        this.sectorList = res;
        this.cdr.detectChanges(); 
      },
      error: () => alert('Failed to load sectors')
    });
  }

  supplierList: any[] = [];

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (res) => {
        this.supplierList = res;
        this.cdr.detectChanges(); 
      },
      error: () => alert('Failed to load suppliers')
    });
  }



  isGroupPopupOpen = false;

  groupForm = {
    groupCode: '',
    groupName: '',
    isActive: true
  };



  openGroupPopup() {

    this.isGroupPopupOpen = true;

    this.groupForm = {
      groupCode: '',
      groupName: '',
      isActive: true
    };

  }

  closeGroupPopup() {
    this.isGroupPopupOpen = false;

  }


  createGroup() {
    this.masterService.createGroup(this.groupForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isGroupPopupOpen = false;
        this.loadGroups()
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }



  isUpdateGroupPopupOpen = false;

  updateGroupForm = {
    id: '',
    groupCode: '',
    groupName: '',
    isActive: true
  };

  openUpdateGroupPopup(group: any) {
    this.updateGroupForm = {
      id: group.id,
      groupCode: group.groupCode,
      groupName: group.groupName,
      isActive: group.isActive
    };
    this.isUpdateGroupPopupOpen = true;
  }

  closeUpdateGroupPopup() {
    this.isUpdateGroupPopupOpen = false;
    this.updateGroupForm = {
      id: '',
      groupCode: '',
      groupName: '',
      isActive: true
    };
  }

  groupUpdate() {
    this.masterService.updateGroup(this.updateGroupForm.id, this.updateGroupForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);

        this.isUpdateGroupPopupOpen = false;
        this.loadGroups();
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  isDeletePopupVisible = false;
  selectedGroupIdToDelete: string = '';


  showDeletePopup(groupId: string): void {
    this.selectedGroupIdToDelete = groupId;
    this.isDeletePopupVisible = true;
  }

  hideDeletePopup(): void {
    this.selectedGroupIdToDelete = '';
    this.isDeletePopupVisible = false;
  }

  deleteGroup(): void {
    this.masterService.deleteGroup(this.selectedGroupIdToDelete).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Group deleted successfully');
        this.loadGroups(); // reload list
        this.isDeletePopupVisible = false; // close modal
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }





  expandedGroup: { [id: string]: boolean } = {};
  companyMap: { [id: string]: any[] } = {};


  toggleGroupRow(group: any): void {
    const id = group.id;

    this.expandedGroup[id] = !this.expandedGroup[id];

    if (this.expandedGroup[id] && !this.companyMap[id]) {
      this.masterService.getCompanyByGroupId(id).subscribe({
        next: (data) => {
          this.companyMap[id] = data; // assuming data is already an array
        },
        error: (err) => {
          console.error('Error loading companies by group ID:', err);
        }
      });
    }
  }

  departmentForm = {
    departmentCode: '',
    departmentName: '',
    otherName: '',
    groupName: '',
    isActive: true
  };

  updateDepartmentForm = {
    id: '',
    departmentCode: '',
    departmentName: '',
    otherName: '',
    groupName: '',
    isActive: true
  };

  isDepartmentPopupOpen = false;
  isUpdateDepartmentPopupOpen = false;
  isDeleteDepartmentPopupOpen = false;

  selectedDepartmentId = '';




  // CREATE
  createDepartment() {
    this.departmentService.createDepartment(this.departmentForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isDepartmentPopupOpen = false;   // ✅ set flag first
        this.loadDepartments();               // ✅ then refresh
        this.resetForm();
        // ✅ detect changes last
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  updateDepartment() {
    this.departmentService.updateDepartment(this.updateDepartmentForm.id, this.updateDepartmentForm).subscribe({
      next: ({ message }) => {
        this.alertService.showAlert(message);
        this.isUpdateDepartmentPopupOpen = false;
        this.loadDepartments();

      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  deleteDepartment() {
    this.departmentService.deleteDepartment(this.selectedDepartmentId).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isDeleteDepartmentPopupOpen = false;
        this.loadDepartments();

      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  openCreateDepartmentPopup() {
    this.resetForm();
    this.isDepartmentPopupOpen = true;
  }


  openUpdateDepartmentPopup(dept: any) {
    this.updateDepartmentForm = { ...dept }; // copy selected dept into form
    this.isUpdateDepartmentPopupOpen = true;
  }

  openDeleteDepartmentPopup(id: string) {
    this.selectedDepartmentId = id;
    this.isDeleteDepartmentPopupOpen = true;
  }

  resetForm() {
    this.departmentForm = {
      departmentCode: '',
      departmentName: '',
      otherName: '',
      groupName: '',
      isActive: true
    };
  }

  // Modal handlers
  closeDepartmentPopup() {
    this.isDepartmentPopupOpen = false;
  }

  closeUpdateDepartmentPopup() {
    this.isUpdateDepartmentPopupOpen = false;
  }

  closeDeleteDepartmentPopup() {
    this.isDeleteDepartmentPopupOpen = false;
  }


  isCustodianPopupOpen = false;


  custodianForm = {
    custodianCode: '',
    custodianName: '',
    custodianEmail: '',
    otherName: '',
    departmentName: '',
    isActive: true
  };

  createCustodian() {
    this.custodianService.createCustodian(this.custodianForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isCustodianPopupOpen = false;
        this.loadCustodians();
        this.resetCustodianForm();

      },

      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  resetCustodianForm() {
    this.custodianForm = {
      custodianCode: '',
      custodianName: '',
      custodianEmail: '',
      otherName: '',
      departmentName: '',
      isActive: true
    };
  }


  openCustodianPopup() {
    this.resetCustodianForm();
    this.isCustodianPopupOpen = true;
  }


  closeCustodianPopup() {
    this.isCustodianPopupOpen = false;
  }

  isUpdateCustodianPopupOpen = false;

  updateCustodianForm = {
    id: '',
    custodianCode: '',
    custodianName: '',
    custodianEmail: '',
    otherName: '',
    departmentName: '',
    isActive: true
  };

  openUpdateCustodianPopup(custodian: any) {
    this.updateCustodianForm = { ...custodian }; // Pre-fill form
    this.isUpdateCustodianPopupOpen = true;
  }

  closeUpdateCustodianPopup() {
    this.isUpdateCustodianPopupOpen = false;
  }



  updateCustodian() {
    this.custodianService.updateCustodian(this.updateCustodianForm.id, this.updateCustodianForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isUpdateCustodianPopupOpen = false;
        this.loadCustodians();

      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  isDeleteCustodianPopupOpen = false;
  selectedCustodianId = '';


  openDeleteCustodianPopup(id: string) {
    this.selectedCustodianId = id;
    this.isDeleteCustodianPopupOpen = true;
  }

  closeDeleteCustodianPopup() {
    this.isDeleteCustodianPopupOpen = false;
  }


  deleteCustodian() {
    this.custodianService.deleteCustodian(this.selectedCustodianId).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isDeleteCustodianPopupOpen = false;
        this.loadCustodians(); // refresh table
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }



  sectorForm: any = {
    sectorCode: '',
    sectorName: '',
    otherName: '',
    groupName: '',
    isActive: true
  };

  updateSectorForm: any = {
    sectorCode: '',
    sectorName: '',
    otherName: '',
    groupName: '',
    isActive: true
  };


  isSectorPopupOpen = false;
  isUpdateSectorPopupOpen = false;
  isDeleteSectorPopupOpen = false;
  selectedSectorId: string = '';


  openSectorPopup() {
    this.isSectorPopupOpen = true;
    this.resetSectorForm();
  }

  closeSectorPopup() {
    this.isSectorPopupOpen = false;
  }

  openUpdateSectorPopup(sector: any) {
    this.updateSectorForm = { ...sector }; // Make sure sector contains `id`
    this.isUpdateSectorPopupOpen = true;
  }


  closeUpdateSectorPopup() {
    this.isUpdateSectorPopupOpen = false;
  }

  openDeleteSectorPopup(sector: any) {
    this.selectedSectorId = sector.id;
    this.isDeleteSectorPopupOpen = true;
  }


  closeDeleteSectorPopup() {
    this.isDeleteSectorPopupOpen = false;
  }

  updateSector() {
    this.sectorService.updateSector(this.updateSectorForm.id, this.updateSectorForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isUpdateSectorPopupOpen = false;
        this.loadSectors();  // Refresh the sector list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }
  createSector() {
    this.sectorService.createSector(this.sectorForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isSectorPopupOpen = false;
        this.loadSectors(); // Refresh the sector list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  deleteSector() {
    this.sectorService.deleteSector(this.selectedSectorId).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isDeleteSectorPopupOpen = false;
        this.loadSectors(); // Refresh the sector list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  resetSectorForm() {
    this.sectorForm = {
      sectorCode: '',
      sectorName: '',
      otherName: '',
      groupName: '',
      isActive: true
    };
  }


  isSupplierPopupOpen = false;
  isUpdateSupplierPopupOpen = false;
  isDeleteSupplierPopupOpen = false;

  selectedSupplierId: string = '';


  supplierForm = {
    supplierCode: '',
    supplierName: '',
    otherName: '',
    groupName: '',
    isActive: true
  };

  updateSupplierForm: any = {
    supplierCode: '',
    supplierName: '',
    otherName: '',
    groupName: '',
    isActive: true
  };

  openSupplierPopup() {
    this.isSupplierPopupOpen = true;
  }

  closeSupplierPopup() {
    this.isSupplierPopupOpen = false;
    this.supplierForm = {
      supplierCode: '',
      supplierName: '',
      otherName: '',
      groupName: '',
      isActive: true
    };
  }

  openUpdateSupplierPopup(supplier: any) {
    this.updateSupplierForm = { ...supplier };
    this.selectedSupplierId = supplier.id;
    this.isUpdateSupplierPopupOpen = true;
  }

  closeUpdateSupplierPopup() {
    this.isUpdateSupplierPopupOpen = false;
    this.updateSupplierForm = {};
  }


  openDeleteSupplierPopup(id: string) {
    this.selectedSupplierId = id;
    this.isDeleteSupplierPopupOpen = true;
  }

  closeDeleteSupplierPopup() {
    this.isDeleteSupplierPopupOpen = false;
  }



  createSupplier() {
    this.supplierService.createSupplier(this.supplierForm).subscribe({
      next: (res: any) => {
         this.alertService.showAlert(res.message || 'Supplier created successfully');
        this.isSupplierPopupOpen = false;
        this.loadSuppliers(); // reload list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  updateSupplier() {
    this.supplierService.updateSupplier(this.updateSupplierForm.id, this.updateSupplierForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Supplier updated successfully');
        this.isUpdateSupplierPopupOpen = false;
        this.loadSuppliers();
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  deleteSupplier() {
    this.supplierService.deleteSupplier(this.selectedSupplierId).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Supplier deleted successfully');
        this.isDeleteSupplierPopupOpen = false;
        this.loadSuppliers();
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  updateCompanyForm: any = {
    id: '',
    groupId: '',
    companyCode: '',
    companyName: '',
    description: '',
    isActive: true
  };

  isUpdateCompanyPopupOpen: boolean = false;

  openUpdateCompanyPopup(company: any) {
    this.updateCompanyForm = { ...company };
    this.isUpdateCompanyPopupOpen = true;
  }

  closeUpdateCompanyPopup() {
    this.isUpdateCompanyPopupOpen = false;
  }



  updateCompany() {
    const groupId = this.updateCompanyForm.groupId;
    this.companyService.updateCompany(this.updateCompanyForm.id, this.updateCompanyForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.isUpdateCompanyPopupOpen = false;
        this.refreshCompanyMap(groupId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  selectedCompany: any = null;
  isDeleteCompanyPopupOpen: boolean = false;

  openDeleteCompanyPopup(company: any) {
    this.selectedCompany = company;
    this.isDeleteCompanyPopupOpen = true;
  }

  closeDeleteCompanyPopup() {
    this.selectedCompany = null;
    this.isDeleteCompanyPopupOpen = false;
  }

  confirmDeleteCompany() {
    if (!this.selectedCompany?.id) return;
    const groupId = this.selectedCompany.groupId;


    this.companyService.deleteCompany(this.selectedCompany.id).subscribe({
      next: () => {
        this.alertService.showAlert('Company deleted successfully.');
        this.closeDeleteCompanyPopup();
        this.refreshCompanyMap(groupId);

      },
      error: () => {
        this.alertService.showAlert('Failed to delete company.',"error");
        this.closeDeleteCompanyPopup();
      }
    });
  }


  isCreateCompanyPopupOpen = false;

  newCompany = {
    groupId: '',        // this will come from selected group
    companyCode: '',
    companyName: '',
    description: '',
    isActive: true
  };

  openCreateCompanyPopup(groupId: string) {
    this.newCompany = {
      groupId: groupId,   // ✅ assign selected group's ID here
      companyCode: '',
      companyName: '',
      description: '',
      isActive: true
    };
    this.isCreateCompanyPopupOpen = true;
  }

  closeCreateCompanyPopup() {
    this.isCreateCompanyPopupOpen = false;
  }

  createCompany() {


    const payload = {
      groupId: this.newCompany.groupId,   // ✅ must be set before calling this
      companyCode: this.newCompany.companyCode,
      companyName: this.newCompany.companyName,
      description: this.newCompany.description,
      isActive: this.newCompany.isActive
    };

    this.companyService.createCompany(payload).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Company created successfully');
        this.closeCreateCompanyPopup();

        this.refreshCompanyMap(this.newCompany.groupId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  refreshCompanyMap(groupId: string): void {
    this.masterService.getCompanyByGroupId(groupId).subscribe({
      next: (data) => {
        this.companyMap[groupId] = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error refreshing company list:', err);
      }
    });
  }

  expandedCompany: { [id: string]: boolean } = {};
  siteMap: { [id: string]: any[] } = {};

  toggleCompanyRow(comp: any): void {
    const id = comp.id;
    this.expandedCompany[id] = !this.expandedCompany[id];

    if (this.expandedCompany[id] && !this.siteMap[id]) {
      this.masterService.getSitesByCompanyId(id).subscribe({
        next: (data) => {
          this.siteMap[id] = data;
        },
        error: (err) => {
          console.error('Error loading sites:', err);
        }
      });
    }
  }

  getSitesByCompanyId(companyId: string): void {
    this.masterService.getSitesByCompanyId(companyId).subscribe({
      next: (data) => {
        this.siteMap[companyId] = data;
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching sites by companyId:', err);
      }
    });
  }



  isCreateSitePopupOpen = false;
  selectedCompanyId = '';
  newSite = {
    siteCode: '',
    siteName: '',
    description: '',
    isActive: true
  };

  openCreateSitePopup(companyId: string) {
    this.selectedCompanyId = companyId;
    this.isCreateSitePopupOpen = true;
    this.newSite = {

      siteCode: '',
      siteName: '',
      description: '',
      isActive: true
    };
  }

  closeCreateSitePopup() {
    this.isCreateSitePopupOpen = false;
  }

  createSite() {
    const payload = {
      companyId: this.selectedCompanyId,
      ...this.newSite
    };

    this.masterService.createSite(payload).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Site created successfully');
        this.closeCreateSitePopup();
        this.getSitesByCompanyId(this.selectedCompanyId); // refresh site list

      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  isUpdateSitePopupOpen: boolean = false;
  selectedSite: any = null;


  openUpdateSitePopup(site: any) {
    this.selectedSite = { ...site }; // clone to avoid two-way binding issues
    this.isUpdateSitePopupOpen = true;
  }


  closeUpdateSitePopup() {
    this.isUpdateSitePopupOpen = false;
    this.selectedSite = null;
  }

  updateSite() {
    if (!this.selectedSite) return;

    const companyId = this.selectedSite.companyId; // store it before nulling

    this.masterService.updateSite(this.selectedSite).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Site updated successfully');

        this.refreshSiteMap(companyId); // ✅ call BEFORE setting selectedSite = null
        this.closeUpdateSitePopup();    // now safe to close
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  refreshSiteMap(companyId: string): void {
    console.log('Fetching sites for companyId:', companyId);
    this.masterService.getSitesByCompanyId(companyId).subscribe({
      next: (sites) => {
        console.log('Sites loaded:', sites);
        this.siteMap[companyId] = sites;
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error refreshing site list:', err);
      }
    });
  }



  isDeleteSitePopupOpen: boolean = false;
  siteToDelete: any = null;

  openDeleteSitePopup(site: any) {
    this.siteToDelete = site;
    this.isDeleteSitePopupOpen = true;
  }

  closeDeleteSitePopup() {
    this.isDeleteSitePopupOpen = false;
    this.siteToDelete = null;
  }

  confirmDeleteSite() {
    const siteId = this.siteToDelete?.id;
    const companyId = this.siteToDelete?.companyId;

    if (!siteId || !companyId) return;

    this.masterService.deleteSite(siteId).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Site deleted successfully');
        this.closeDeleteSitePopup();
        this.refreshSiteMap(companyId); // reload updated list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }



  expandedSite: { [id: string]: boolean } = {};
  buildingMap: { [id: string]: any[] } = {};


  toggleSiteRow(site: any): void {
    const id = site.id;
    this.expandedSite[id] = !this.expandedSite[id];

    if (this.expandedSite[id] && !this.buildingMap[id]) {
      this.masterService.getBuildingsBySiteId(id).subscribe({
        next: (data) => {
          this.buildingMap[id] = data;
        },
        error: (err) => {
          console.error('Error loading buildings:', err);
        }
      });
    }
  }



  isCreateBuildingPopupOpen: boolean = false;
  newBuilding: any = {
    siteId: '',
    buildingCode: '',
    buildingName: '',
    description: '',
    isActive: true
  };



  openCreateBuildingPopup(siteId: string): void {
    this.newBuilding = {
      siteId: siteId,
      buildingCode: '',
      buildingName: '',
      description: '',
      isActive: true
    };
    this.isCreateBuildingPopupOpen = true;
  }



  closeCreateBuildingPopup(): void {
    this.isCreateBuildingPopupOpen = false;
    this.newBuilding = {
      siteId: '',
      buildingCode: '',
      buildingName: '',
      description: '',
      isActive: true
    };
  }



  createBuilding(): void {

    const currentSiteId = this.newBuilding.siteId; // ✅ Capture before reset

    this.masterService.createBuilding(this.newBuilding).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Building created successfully');
        this.closeCreateBuildingPopup();
        this.refreshBuildingMap(currentSiteId); // ✅ Use saved value
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }




  refreshBuildingMap(siteId: string): void {
    if (!siteId) {
      console.error('SiteId is missing in refreshBuildingMap');
      return;
    }

    this.masterService.getBuildingsBySiteId(siteId).subscribe({
      next: (data) => {
        this.buildingMap[siteId] = data;
         this.cdr.detectChanges();
        console.log('Building map updated for site:', siteId, data);
      },
      error: (err) => {
        console.error('Error loading buildings:', err);
      }
    });
  }


  isUpdateBuildingPopupOpen: boolean = false;
  selectedBuilding: any = null;


  openUpdateBuildingPopup(building: any): void {
    this.selectedBuilding = { ...building }; // clone to avoid direct binding
    this.isUpdateBuildingPopupOpen = true;
  }

  closeUpdateBuildingPopup(): void {
    this.isUpdateBuildingPopupOpen = false;
    this.selectedBuilding = null;
  }

  updateBuilding(): void {
    const siteId = this.selectedBuilding.siteId; // Save before reset

    this.masterService.updateBuilding(this.selectedBuilding).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Building updated successfully');
        this.closeUpdateBuildingPopup();
        this.refreshBuildingMap(siteId); // Refresh updated data
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  isDeleteBuildingPopupOpen: boolean = false;
  buildingToDelete: any = null;

  openDeleteBuildingPopup(building: any): void {
    this.buildingToDelete = building;
    this.isDeleteBuildingPopupOpen = true;
  }

  closeDeleteBuildingPopup(): void {
    this.isDeleteBuildingPopupOpen = false;
    this.buildingToDelete = null;
  }

  confirmDeleteBuilding(): void {
    if (!this.buildingToDelete) return;

    const siteId = this.buildingToDelete.siteId; // cache before reset

    this.masterService.deleteBuilding(this.buildingToDelete.id).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Building deleted successfully');
        this.refreshBuildingMap(siteId); // must call before reset
        this.closeDeleteBuildingPopup(); // resets buildingToDelete
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  expandedBuilding: { [id: string]: boolean } = {};
  floorMap: { [id: string]: any[] } = {};

  toggleBuildingRow(building: any): void {
    const id = building.id;
    this.expandedBuilding[id] = !this.expandedBuilding[id];

    if (this.expandedBuilding[id] && !this.floorMap[id]) {
      this.masterService.getFloorsByBuildingId(id).subscribe({
        next: (data) => {
          this.floorMap[id] = data;
        },
        error: (err) => {
          console.error('Error loading floors:', err);
        }
      });
    }
  }


  isCreateFloorPopupOpen: boolean = false;
  newFloor: any = {
    buildingId: '',
    floorCode: '',
    floorName: '',
    description: '',
    isActive: true
  };

  openCreateFloorPopup(buildingId: string): void {
    this.newFloor = {
      buildingId: buildingId,
      floorCode: '',
      floorName: '',
      description: '',
      isActive: true
    };
    this.isCreateFloorPopupOpen = true;
  }

  closeCreateFloorPopup(): void {
    this.isCreateFloorPopupOpen = false;
    this.newFloor = {
      buildingId: '',
      floorCode: '',
      floorName: '',
      description: '',
      isActive: true
    };
  }

  createFloor(): void {
    const buildingId = this.newFloor.buildingId;
    this.masterService.createFloor(this.newFloor).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Floor created successfully');
        this.closeCreateFloorPopup();
        this.refreshFloorMap(buildingId); // Refresh floor list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  refreshFloorMap(buildingId: string): void {
    if (!buildingId) {
      console.error('BuildingId missing in refreshFloorMap');
      return;
    }

    this.masterService.getFloorsByBuildingId(buildingId).subscribe({
      next: (data) => {
        this.floorMap[buildingId] = data;
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading floors:', err);
      }
    });
  }

  isUpdateFloorPopupOpen: boolean = false;
  selectedFloor: any = null;

  openUpdateFloorPopup(floor: any): void {
    this.selectedFloor = { ...floor };
    this.isUpdateFloorPopupOpen = true;
  }

  closeUpdateFloorPopup(): void {
    this.isUpdateFloorPopupOpen = false;
    this.selectedFloor = null;
  }

  updateFloor(): void {
    if (!this.selectedFloor) return;

    const buildingId = this.selectedFloor.buildingId;

    this.masterService.updateFloor(this.selectedFloor).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Floor updated successfully');
        this.closeUpdateFloorPopup();
        this.refreshFloorMap(buildingId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  isDeleteFloorPopupOpen: boolean = false;
  floorToDelete: any = null;

  openDeleteFloorPopup(floor: any): void {
    this.floorToDelete = floor;
    this.isDeleteFloorPopupOpen = true;
  }

  closeDeleteFloorPopup(): void {
    this.isDeleteFloorPopupOpen = false;
    this.floorToDelete = null;
  }

  confirmDeleteFloor(): void {
    if (!this.floorToDelete) return;

    const buildingId = this.floorToDelete.buildingId;

    this.masterService.deleteFloor(this.floorToDelete.id).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Floor deleted successfully');
        this.closeDeleteFloorPopup();
        this.refreshFloorMap(buildingId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  expandedFloor: { [id: string]: boolean } = {};
  roomMap: { [id: string]: any[] } = {};

  toggleFloorRow(floor: any): void {
    const id = floor.id;
    this.expandedFloor[id] = !this.expandedFloor[id];

    if (this.expandedFloor[id] && !this.roomMap[id]) {
      this.masterService.getRoomsByFloorId(id).subscribe({
        next: (data) => {
          this.roomMap[id] = data;
        },
        error: (err) => {
          console.error('Error loading rooms:', err);
        }
      });
    }
  }

  isCreateRoomPopupOpen: boolean = false;
  newRoom: any = {
    floorId: '',
    roomCode: '',
    roomName: '',
    description: '',
    isActive: true


  };
  openCreateRoomPopup(floorId: string): void {
    this.isCreateRoomPopupOpen = true;

    this.newRoom = {
      floorId: floorId,
      roomCode: '',
      roomName: '',
      description: '',
      isActive: true
    };

  }


  closeCreateRoomPopup(): void {
    this.isCreateRoomPopupOpen = false;
    this.newRoom = {
      floorId: '',
      roomCode: '',
      roomName: '',
      description: '',
      isActive: true
    };
  }

  createRoom(): void {
    const floorId = this.newRoom.floorId;

    this.masterService.createRoom(this.newRoom).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Room created successfully');
        this.closeCreateRoomPopup();
        this.refreshRoomMap(floorId); // Refresh room list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });


  }

  refreshRoomMap(floorId: string): void {
    if (!floorId) {
      console.error('FloorId missing in refreshRoomMap');
      return;
    }

    this.masterService.getRoomsByFloorId(floorId).subscribe({
      next: (data) => {
        this.roomMap[floorId] = data;
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading rooms:', err);
      }
    });

  }

  isUpdateRoomPopupOpen: boolean = false;
  selectedRoom: any = null;

  openUpdateRoomPopup(room: any): void {
    this.selectedRoom = { ...room };
    this.isUpdateRoomPopupOpen = true;
  }

  closeUpdateRoomPopup(): void {
    this.isUpdateRoomPopupOpen = false;
    this.selectedRoom = null;
  }

  updateRoom(): void {
    if (!this.selectedRoom) return;

    const floorId = this.selectedRoom.floorId;

    this.masterService.updateRoom(this.selectedRoom).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Room updated successfully');
        this.closeUpdateRoomPopup();
        this.refreshRoomMap(floorId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  isDeleteRoomPopupOpen: boolean = false;
  roomToDelete: any = null;

  openDeleteRoomPopup(room: any): void {
    this.roomToDelete = room;
    this.isDeleteRoomPopupOpen = true;
  }

  closeDeleteRoomPopup(): void {
    this.isDeleteRoomPopupOpen = false;
    this.roomToDelete = null;
  }

  confirmDeleteRoom(): void {
    if (!this.roomToDelete) return;

    const floorId = this.roomToDelete.floorId;

    this.masterService.deleteRoom(this.roomToDelete.id).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Room deleted successfully');
        this.closeDeleteRoomPopup();
        this.refreshRoomMap(floorId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }








  categoryMap: { [groupId: string]: any[] } = {};
  expandedCategory: { [groupId: string]: boolean } = {};



  toggleCategoryRow(group: any): void {
    const groupId = group.id;
    this.expandedCategory[groupId] = !this.expandedCategory[groupId];

    // Only call API if expanding and data not already loaded
    if (this.expandedCategory[groupId] && !this.categoryMap[groupId]) {
      this.categoryService.getMainCategoryByGroupId(groupId).subscribe({
        next: (data) => {
          this.categoryMap[groupId] = data;
        },
        error: (err) => {
          console.error('Error fetching category data:', err);
        }
      });
    }
  }

  isCreateCategoryPopupOpen: boolean = false;

  newCategory: any = {
    groupId: '',
    categoryCode: '',
    categoryName: '',
    isActive: true
  };

  // Open popup and initialize form
  openCreateCategoryPopup(groupId: string): void {
    this.isCreateCategoryPopupOpen = true;
    this.newCategory = {
      groupId: groupId,
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }

  // Close popup and reset form
  closeCreateCategoryPopup(): void {
    this.isCreateCategoryPopupOpen = false;
    this.newCategory = {
      groupId: '',
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }

  // Create category and refresh list
  createCategory(): void {
    const groupId = this.newCategory.groupId;

    this.categoryService.createCategory(this.newCategory).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Category created successfully');
        this.closeCreateCategoryPopup();
        this.refreshCategoryMap(groupId); // Refresh category list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  refreshCategoryMap(groupId: string): void {
    if (!groupId) {
      console.error('GroupId missing in refreshCategoryMap');
      return;
    }

    this.categoryService.getMainCategoryByGroupId(groupId).subscribe({
      next: (data) => {
        this.categoryMap[groupId] = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading main categories:', err);
      }
    });
  }


  isUpdateCategoryPopupOpen: boolean = false;

  selectedCategory: any = {
    id: '',
    groupId: '',
    categoryCode: '',
    categoryName: '',
    isActive: true
  };


  openUpdateCategoryPopup(category: any): void {
    this.isUpdateCategoryPopupOpen = true;
    this.selectedCategory = { ...category }; // shallow copy to prevent binding issues
  }


  closeUpdateCategoryPopup(): void {
    this.isUpdateCategoryPopupOpen = false;
    this.selectedCategory = {
      id: '',
      groupId: '',
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }


  updateCategory(): void {
    const groupId = this.selectedCategory.groupId;

    this.categoryService.updateMainCategory(this.selectedCategory.id, this.selectedCategory).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Category updated successfully');
        this.closeUpdateCategoryPopup();
        this.refreshCategoryMap(groupId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  isDeleteCategoryPopupOpen: boolean = false;
  selectedCategoryToDelete: any = null;


  openDeleteCategoryPopup(category: any): void {
    this.isDeleteCategoryPopupOpen = true;
    this.selectedCategoryToDelete = category;
  }


  closeDeleteCategoryPopup(): void {
    this.isDeleteCategoryPopupOpen = false;
    this.selectedCategoryToDelete = null;
  }


  deleteCategory(): void {
    const categoryId = this.selectedCategoryToDelete?.id;
    const groupId = this.selectedCategoryToDelete?.groupId;

    if (!categoryId) return;

    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.alertService.showAlert('Category deleted successfully');
        this.closeDeleteCategoryPopup();
        this.refreshCategoryMap(groupId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }




  expandedSubCategory: { [mainCategoryId: string]: boolean } = {};
  subCategoryMap: { [mainCategoryId: string]: any[] } = {};

  toggleSubCategoryRow(category: any): void {
    const categoryId = category.id;
    this.expandedSubCategory[categoryId] = !this.expandedSubCategory[categoryId];

    if (this.expandedSubCategory[categoryId] && !this.subCategoryMap[categoryId]) {
      this.subCategoryService.getSubCategoriesByMainCategory(categoryId).subscribe({
        next: (data) => {
          this.subCategoryMap[categoryId] = data;
        },
        error: (err) => {
          console.error('Failed to load subcategories:', err);
        }
      });
    }
  }



  isCreateSubCategoryPopupOpen: boolean = false;

  newSubCategory: any = {
    mainCategoryId: '',
    categoryCode: '',
    categoryName: '',
    isActive: true
  };

  openCreateSubCategoryPopup(mainCategoryId: string): void {
    this.isCreateSubCategoryPopupOpen = true;
    this.newSubCategory = {
      mainCategoryId: mainCategoryId,
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }

  closeCreateSubCategoryPopup(): void {
    this.isCreateSubCategoryPopupOpen = false;
    this.newSubCategory = {
      mainCategoryId: '',
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }

  createSubCategory(): void {
    const mainCategoryId = this.newSubCategory.mainCategoryId;

    this.subCategoryService.createSubCategory(this.newSubCategory).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.closeCreateSubCategoryPopup();
        this.refreshSubCategoryMap(mainCategoryId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  refreshSubCategoryMap(mainCategoryId: string): void {
    this.subCategoryService.getSubCategoriesByMainCategory(mainCategoryId).subscribe({
      next: (data) => {
        this.subCategoryMap[mainCategoryId] = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading subcategories:', err);
      }
    });
  }


  isUpdateSubCategoryPopupOpen: boolean = false;
  selectedSubCategory: any = null;

  updateSubCategoryForm: any = {
    id: '',
    mainCategoryId: '',
    categoryCode: '',
    categoryName: '',
    isActive: true
  };

  openUpdateSubCategoryPopup(subCat: any): void {
    this.isUpdateSubCategoryPopupOpen = true;
    this.selectedSubCategory = subCat;

    this.updateSubCategoryForm = {
      id: subCat.id,
      mainCategoryId: subCat.mainCategoryId,
      categoryCode: subCat.categoryCode,
      categoryName: subCat.categoryName,
      isActive: subCat.isActive
    };
  }

  closeUpdateSubCategoryPopup(): void {
    this.isUpdateSubCategoryPopupOpen = false;
    this.updateSubCategoryForm = {
      id: '',
      mainCategoryId: '',
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }

  updateSubCategory(): void {
    const id = this.updateSubCategoryForm.id;
    const mainCategoryId = this.updateSubCategoryForm.mainCategoryId;

    this.subCategoryService.updateSubCategory(id, this.updateSubCategoryForm).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.closeUpdateSubCategoryPopup();
        this.refreshSubCategoryMap(mainCategoryId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  isDeleteSubCategoryPopupOpen: boolean = false;
  selectedSubCategoryForDelete: any = null;

  openDeleteSubCategoryPopup(subCat: any): void {
    this.isDeleteSubCategoryPopupOpen = true;
    this.selectedSubCategoryForDelete = subCat;
  }

  closeDeleteSubCategoryPopup(): void {
    this.isDeleteSubCategoryPopupOpen = false;
    this.selectedSubCategoryForDelete = null;
  }

  confirmDeleteSubCategory(): void {
    const subCat = this.selectedSubCategoryForDelete;
    if (!subCat?.id) return;

    this.subCategoryService.deleteSubCategory(subCat.id).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.closeDeleteSubCategoryPopup();
        this.refreshSubCategoryMap(subCat.mainCategoryId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  expandedSubSubCategory: { [key: string]: boolean } = {};
  subSubCategoryMap: { [key: string]: any[] } = {};


  toggleSubSubCategoryRow(subCategory: any): void {
    const subCategoryId = subCategory.id;
    this.expandedSubSubCategory[subCategoryId] = !this.expandedSubSubCategory[subCategoryId];

    if (this.expandedSubSubCategory[subCategoryId] && !this.subSubCategoryMap[subCategoryId]) {
      this.subSubCategoryService.getSubSubCategoriesBySubCategoryId(subCategoryId).subscribe({
        next: (data) => {
          this.subSubCategoryMap[subCategoryId] = data;
        },
        error: (err) => {
          console.error('Error fetching sub-subcategory data:', err);
        }
      });
    }
  }

  refreshSubSubCategoryMap(subCategoryId: string): void {
    this.subSubCategoryService.getSubSubCategoriesBySubCategoryId(subCategoryId).subscribe({
      next: (data) => {
        this.subSubCategoryMap[subCategoryId] = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error refreshing sub-subcategory data:', err);
      }
    });
  }



  isCreateSubSubCategoryPopupOpen: boolean = false;

  newSubSubCategory: any = {
    subCategoryId: '',
    categoryCode: '',
    categoryName: '',
    isActive: true
  };


  openCreateSubSubCategoryPopup(subCategoryId: string): void {
    this.isCreateSubSubCategoryPopupOpen = true;
    this.newSubSubCategory = {
      subCategoryId: subCategoryId,
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }



  closeCreateSubSubCategoryPopup(): void {
    this.isCreateSubSubCategoryPopupOpen = false;
    this.newSubSubCategory = {
      subCategoryId: '',
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }


  createSubSubCategory(): void {
    const subCategoryId = this.newSubSubCategory.subCategoryId;

    this.subSubCategoryService.createSubSubCategory(this.newSubSubCategory).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Sub-SubCategory created successfully');
        this.closeCreateSubSubCategoryPopup();
        this.refreshSubSubCategoryMap(subCategoryId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  isUpdateSubSubCategoryPopupOpen: boolean = false;

  selectedSubSubCategory: any = null;

  updateSubSubCategoryData: any = {
    subCategoryId: '',
    categoryCode: '',
    categoryName: '',
    isActive: true
  };


  openUpdateSubSubCategoryPopup(subSubCat: any): void {
    this.isUpdateSubSubCategoryPopupOpen = true;
    this.selectedSubSubCategory = subSubCat;
    this.updateSubSubCategoryData = {
      subCategoryId: subSubCat.subCategoryId,
      categoryCode: subSubCat.categoryCode,
      categoryName: subSubCat.categoryName,
      isActive: subSubCat.isActive
    };
  }


  closeUpdateSubSubCategoryPopup(): void {
    this.isUpdateSubSubCategoryPopupOpen = false;
    this.selectedSubSubCategory = null;
    this.updateSubSubCategoryData = {
      subCategoryId: '',
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }


  updateSubSubCategory(): void {
    const id = this.selectedSubSubCategory?.id;
    const subCategoryId = this.updateSubSubCategoryData.subCategoryId;

    if (!id) {
      alert('Invalid Sub-SubCategory ID');
      return;
    }

    this.subSubCategoryService.updateSubSubCategory(id, this.updateSubSubCategoryData).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Sub-SubCategory updated successfully');
        this.closeUpdateSubSubCategoryPopup();
        this.refreshSubSubCategoryMap(subCategoryId);  // Refresh after update
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  isDeleteSubSubCategoryPopupOpen: boolean = false;

  openDeleteSubSubCategoryPopup(subSubCat: any): void {
    this.isDeleteSubSubCategoryPopupOpen = true;
    this.selectedSubSubCategory = subSubCat;
  }

  closeDeleteSubSubCategoryPopup(): void {
    this.isDeleteSubSubCategoryPopupOpen = false;
    this.selectedSubSubCategory = null;
  }


  confirmDeleteSubSubCategory(): void {
    const id = this.selectedSubSubCategory?.id;
    const subCategoryId = this.selectedSubSubCategory?.subCategoryId;

    this.subSubCategoryService.deleteSubSubCategory(id).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Sub-SubCategory deleted successfully');
        this.closeDeleteSubSubCategoryPopup();
        this.refreshSubSubCategoryMap(subCategoryId); // Refresh the list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  brandMap: { [subSubCategoryId: string]: any[] } = {};
  expandedBrand: { [subSubCategoryId: string]: boolean } = {};


  toggleBrandRow(subSubCategory: any): void {
    const subSubCategoryId = subSubCategory.id;
    this.expandedBrand[subSubCategoryId] = !this.expandedBrand[subSubCategoryId];

    if (this.expandedBrand[subSubCategoryId] && !this.brandMap[subSubCategoryId]) {
      this.brandService.getBrandsBySubSubCategoryId(subSubCategoryId).subscribe({
        next: (data) => {
          this.brandMap[subSubCategoryId] = data;
        },
        error: (err) => {
          console.error('Error fetching brand data:', err);
        }
      });
    }
  }


  isCreateBrandPopupOpen: boolean = false;

  newBrand: any = {
    subSubCategoryId: '',
    categoryCode: '',
    categoryName: '',
    isActive: true
  };


  openCreateBrandPopup(subSubCategoryId: string): void {
    this.isCreateBrandPopupOpen = true;
    this.newBrand = {
      subSubCategoryId: subSubCategoryId,
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }

  closeCreateBrandPopup(): void {
    this.isCreateBrandPopupOpen = false;
    this.newBrand = {
      subSubCategoryId: '',
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }


  createBrand(): void {
    const subSubCategoryId = this.newBrand.subSubCategoryId;

    this.brandService.createBrand(this.newBrand).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Brand created successfully');
        this.closeCreateBrandPopup();
        this.refreshBrandMap(subSubCategoryId); // refresh table
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  refreshBrandMap(subSubCategoryId: string): void {
    this.brandService.getBrandsBySubSubCategoryId(subSubCategoryId).subscribe({
      next: (data) => {
        this.brandMap[subSubCategoryId] = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading brand data:', err);
      }
    });
  }


  isUpdateBrandPopupOpen: boolean = false;


  updatedBrand: any = {
    id: '',
    subSubCategoryId: '',
    categoryCode: '',
    categoryName: '',
    isActive: true
  };

  openUpdateBrandPopup(brand: any): void {
    this.updatedBrand = { ...brand }; // clone object
    this.isUpdateBrandPopupOpen = true;
  }


  closeUpdateBrandPopup(): void {
    this.isUpdateBrandPopupOpen = false;
    this.updatedBrand = {
      id: '',
      subSubCategoryId: '',
      categoryCode: '',
      categoryName: '',
      isActive: true
    };
  }


  updateBrand(): void {
    const id = this.updatedBrand.id;
    const subSubCategoryId = this.updatedBrand.subSubCategoryId;

    this.brandService.updateBrand(id, this.updatedBrand).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Brand updated successfully');
        this.closeUpdateBrandPopup();
        this.refreshBrandMap(subSubCategoryId); // refresh brand list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  isDeleteBrandPopupOpen: boolean = false;
  selectedBrand: any = null;


  openDeleteBrandPopup(brand: any): void {
    this.selectedBrand = brand;
    this.isDeleteBrandPopupOpen = true;
  }


  closeDeleteBrandPopup(): void {
    this.isDeleteBrandPopupOpen = false;
    this.selectedBrand = null;
  }

  confirmDeleteBrand(): void {
    if (!this.selectedBrand) return;

    const brandId = this.selectedBrand.id;
    const subSubCategoryId = this.selectedBrand.subSubCategoryId;

    this.brandService.deleteBrand(brandId).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Brand deleted successfully');
        this.refreshBrandMap(subSubCategoryId);
        this.closeDeleteBrandPopup();
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }



  modelMap: { [brandId: string]: any[] } = {};
  expandedModel: { [brandId: string]: boolean } = {};

  toggleModelRow(brand: any): void {
    const brandId = brand.id;
    this.expandedModel[brandId] = !this.expandedModel[brandId];

    if (this.expandedModel[brandId] && !this.modelMap[brandId]) {
      this.modelService.getModelsByBrandId(brandId).subscribe({
        next: (data) => {
          this.modelMap[brandId] = data;
        },
        error: (err) => {
          console.error('Error fetching models:', err);
        }
      });
    }
  }



  isCreateModelPopupOpen: boolean = false;

  newModel: any = {
    brandId: '',
    modelCode: '',
    modelName: '',
    isActive: true
  };

  openCreateModelPopup(brandId: string): void {
    this.isCreateModelPopupOpen = true;
    this.newModel = {
      brandId: brandId,
      modelCode: '',
      modelName: '',
      isActive: true
    };
  }

  closeCreateModelPopup(): void {
    this.isCreateModelPopupOpen = false;
    this.newModel = {
      brandId: '',
      modelCode: '',
      modelName: '',
      isActive: true
    };
  }

  createModel(): void {
    const brandId = this.newModel.brandId;

    this.modelService.createModel(this.newModel).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Model created successfully');
        this.closeCreateModelPopup();
        this.refreshModelMap(brandId); // Refresh the model list for this brand
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  refreshModelMap(brandId: string): void {
    if (!brandId) return;

    this.modelService.getModelsByBrandId(brandId).subscribe({
      next: (data) => {
        this.modelMap[brandId] = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching models:', err);
      }
    });
  }

  isUpdateModelPopupOpen: boolean = false;
  selectedModelToUpdate: any = {
    id: '',
    brandId: '',
    modelCode: '',
    modelName: '',
    isActive: true
  };

  openUpdateModelPopup(model: any): void {
    this.selectedModelToUpdate = { ...model }; // Deep copy to edit
    this.isUpdateModelPopupOpen = true;
  }

  closeUpdateModelPopup(): void {
    this.isUpdateModelPopupOpen = false;
    this.selectedModelToUpdate = {
      id: '',
      brandId: '',
      modelCode: '',
      modelName: '',
      isActive: true
    };
  }

  updateModel(): void {
    const id = this.selectedModelToUpdate.id;
    const brandId = this.selectedModelToUpdate.brandId;

    const updatePayload = {
      brandId: this.selectedModelToUpdate.brandId,
      modelCode: this.selectedModelToUpdate.modelCode,
      modelName: this.selectedModelToUpdate.modelName,
      isActive: this.selectedModelToUpdate.isActive
    };

    this.modelService.updateModel(id, updatePayload).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Model updated successfully');
        this.closeUpdateModelPopup();
        this.refreshModelMap(brandId);
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  isDeleteModelPopupOpen: boolean = false;
  selectedModelIdtoDelete: any = null;

  openDeleteModelPopup(model: any): void {
    this.selectedModelIdtoDelete = model;
    this.isDeleteModelPopupOpen = true;
  }

  closeDeleteModelPopup(): void {
    this.isDeleteModelPopupOpen = false;
    this.selectedModelIdtoDelete = null;
  }

  confirmDeleteModel(): void {
    const brandId = this.selectedModelIdtoDelete.brandId;

    if (!this.selectedModelIdtoDelete) return;

    this.modelService.deleteModel(this.selectedModelIdtoDelete.id).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Model deleted successfully');
        this.closeDeleteModelPopup();
        this.refreshModelMap(brandId); // Refresh list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
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
      purchaseCode:""
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


  // createAsset() {
  //   this.assetService.createAsset(this.newAsset).subscribe({
  //     next: (res: any) => {
  //       this.alertService.showAlert(res.message,"success");
  //       this.isCreateAssetPopup = false;
  //       this.loadAsset();
  //     },
  //       error: (err) => {
  //       // const errorMsg = err?.error?.message;
  //       this.alertService.showAlert(err.message, "error");
  //     }
  //   })

  // }

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
        this.loadAsset();
      },
      error: (err) => {
        this.alertService.showAlert(err.message, "error");
      }
    });
  }




  // companyList:any[]=[];

  //   getCompanyByGroupId(group:string){
  //     this.assetService.getCompanyByGroupId(group).subscribe({
  //     next:(res:any)=>{
  //        this.companyList = res;
  //     },

  //   })
  // }


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



  siteList: any[] = []
  // getSiteByCompanyId(companyName:string){
  //   this.assetService.getSiteByCompanyId(companyName).subscribe({
  //     next:(res:any)=>{
  //        this.siteList = res;
  //     },
  //   })
  // }

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

  buildingList: any[] = []

  // getBuildingBySiteId(siteName:string){
  //   this.assetService.getBuildingBySiteId(siteName).subscribe({
  //     next:(res:any)=>{
  //        this.buildingList = res;
  //     },
  //   })
  // }

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

  //   getFloorByBuildingId(buildingName:string){
  //     this.assetService.getFloorByBuildingId(buildingName).subscribe({
  //       next:(res:any)=>{
  //          this.floorList = res;
  //       },
  //     })
  //   }

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

  //   getRoomByFloorId(floor:string){
  //     this.assetService.getRoomByFloorId(floor).subscribe({
  //       next:(res:any)=>{
  //          this.roomList = res;
  //       },
  //     })
  //   }

  getRoomByFloorId(floorId: string) {
    this.assetService.getRoomByFloorId(floorId).subscribe({
      next: (res: any) => {
        this.roomList = res;

        const selected = this.roomList.find(r => r.id === this.newAsset.room);
        this.newAsset.room = selected ? selected.roomName : '';
      }
    });
  }


  //   mainCategoryList:any[]=[];

  //   getMainCategoryByGroupId(mainCategory:string){
  //     this.assetService.getMainCategoryByGroupId(mainCategory).subscribe({
  //       next:(res:any)=>{
  //          this.mainCategoryList = res;
  //       },
  //     })
  //   }

  //   subCategoryList:any[]=[];

  //   getSubCategoryByMainCategoryId(subCategory:string){
  //     this.assetService.getSubCategoryByMainCategoryId(subCategory).subscribe({
  //       next:(res:any)=>{
  //          this.subCategoryList = res;
  //       },
  //     })
  //   }

  //   subSubCategoryList:any[]=[];

  //   getSubSubCategoryBySubCategoryId(subSubCategory:string){
  //     this.assetService.getSubSubCategoryBySubCategoryId(subSubCategory).subscribe({
  //       next:(res:any)=>{
  //          this.subSubCategoryList = res;
  //       },
  //     })
  //   }

  //   brandList:any[]=[];
  //   getBrandBySubSubCategoryId(brand:string){
  //     this.assetService.getBrandBySubSubCategoryId(brand).subscribe({
  //       next:(res:any)=>{
  //          this.brandList = res;
  //       },
  //     })
  //   }

  //   modelList:any[]=[];
  //   getModelByBrandId(model:string){
  //     this.assetService.getModelByBrandId(model).subscribe({
  //       next:(res:any)=>{
  //          this.modelList = res;
  //       },
  //     })
  //   }

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


  isUpdateAssetPopupOpen: boolean = false;

  openUpdateAssetPopup(asset: any) {
    this.isUpdateAssetPopupOpen = true;
    this.newAsset = { ...asset }; // Clone to avoid direct mutation 
    this.loadGroups();
    this.loadDepartments();
    this.loadCustodians();
    this.loadSectors();

  }

  closeUpdateAssetPopup() {
    this.isUpdateAssetPopupOpen = false;
  }

  updateAsset() {
    // Replace IDs with names (same as createAsset)
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

    this.assetService.updateAsset(this.newAsset.id, this.newAsset).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message, "success");
        this.isUpdateAssetPopupOpen = false;
        this.loadAsset();
      },
      error: (err) => {
        this.alertService.showAlert(err.message, "error");
      }
    });
  }


  isdeleteAssetPopupOpen: boolean = false;
  isSelectAssetIdToDelete:any="";

  openDeleteAssetPopup(asset:any) {
    this.isdeleteAssetPopupOpen = true;
    this.isSelectAssetIdToDelete =asset;
  }

  closeDeleteAssetPopup() {
    this.isdeleteAssetPopupOpen = false;
  }

  deleteAsset() {
    this.assetService.deleteAsset(this.isSelectAssetIdToDelete.id).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message, "success");
        this.isdeleteAssetPopupOpen = false;
        this.loadAsset();
      },
      error: (err) => {
        this.alertService.showAlert(err.message, "error");
      }
    });
  }
}