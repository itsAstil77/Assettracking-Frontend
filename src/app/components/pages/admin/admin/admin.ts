import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../services/role/role';
import { FormsModule } from '@angular/forms';
import { User } from '../../../services/user/user';
import { Alert } from '../../../services/alert/alert';
import { Approval } from '../../../services/approval/approval';
import { Masters } from '../../../services/masters/masters';



@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {


  ngOnInit(): void {
    this.loadRoleAccessSummary();
    this.loadUsers();
    this.getApproval();
  }
  constructor(private roleService: Role, private userService: User, private alertService: Alert, private approvalService: Approval,
    private masterService: Masters,private cdr: ChangeDetectorRef
  ) { }

  selectedRole: string = 'role';

  roleAccessList: any[] = [];
  rolePageSizeOptions: number[] = [5, 10, 20, 50];
  roleItemsPerPage: number = 10;
  roleCurrentPage: number = 1;

  roleStartItem: number = 0;
  roleEndItem: number = 0;
  roleTotalItems: number = 0;


  loadRoleAccessSummary(): void {
    this.roleService.getRoleAccessSummary(this.roleCurrentPage, this.roleItemsPerPage).subscribe({
      next: (res: any) => {
        this.roleAccessList = res.data;
        this.roleTotalItems = res.totalCount;

        this.roleStartItem = (this.roleCurrentPage - 1) * this.roleItemsPerPage + 1;
        this.roleEndItem = Math.min(this.roleStartItem + this.roleAccessList.length - 1, this.roleTotalItems);
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading role access summary:', err);
      }
    });
  }


  onRoleItemsPerPageChange(): void {
    this.roleCurrentPage = 1;
    this.loadRoleAccessSummary();
  }

  prevRolePage(): void {
    if (this.roleCurrentPage > 1) {
      this.roleCurrentPage--;
      this.loadRoleAccessSummary();
    }
  }

  nextRolePage(): void {
    if (this.roleEndItem < this.roleTotalItems) {
      this.roleCurrentPage++;
      this.loadRoleAccessSummary();
    }
  }


  newRoleAccess: any = {
    roleName: '',
    accessList: [
      {
        moduleName: '',
        isAllowed: false,
        canView: false,
        canAddUser: false
      }
    ]
  };

  isCreateRoleAccessPopupOpen: boolean = false;

  openCreateRoleAccessPopup(): void {
    console.log("open")
    this.isCreateRoleAccessPopupOpen = true;
    this.newRoleAccess = {
      id: "",
      roleName: '',
      accessList: [
        {
          moduleName: '',
          isAllowed: false,
          canView: false,
          canAddUser: false
        }
      ]
    };
  }

  closeCreateRoleAccessPopup(): void {
    this.isCreateRoleAccessPopupOpen = false;
  }


  createRoleAccess(): void {
    this.roleService.createRoleAccess(this.newRoleAccess).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'Role access created successfully');
        this.isCreateRoleAccessPopupOpen = false;
        this.loadRoleAccessSummary(); // refresh list
        this.closeDeleteRoleAccessPopup();


      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  selectedRoleAccessToUpdate: any = null;
  isUpdateRoleAccessPopupOpen: boolean = false;

  openUpdateRoleAccessPopup(role: any): void {
    this.selectedRoleAccessToUpdate = {
      id: role.id,
      roleName: role.roleName,
      accessList: [
        {
          moduleName: role.accessList[0]?.moduleName || '',
          isAllowed: role.accessList[0]?.isAllowed || false,
          canView: role.accessList[0]?.canView || false,
          canAddUser: role.accessList[0]?.canAddUser || false
        }
      ]
    };
    this.isUpdateRoleAccessPopupOpen = true;
  }

  closeUpdateRoleAccessPopup(): void {
    this.isUpdateRoleAccessPopupOpen = false;
    this.selectedRoleAccessToUpdate = null;
  }


  updateRoleAccess(): void {
    this.roleService.updateRoleAccess(this.selectedRoleAccessToUpdate.id, this.selectedRoleAccessToUpdate).subscribe({
      next: (res) => {

        this.alertService.showAlert(res.message || 'Role Access updated successfully');
        this.closeUpdateRoleAccessPopup();
        this.loadRoleAccessSummary(); // Refresh the list

      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  isDeleteRoleAccessPopupOpen: boolean = false;
  selectedRoleAccess: any = null;


  openDeleteRoleAccessPopup(role: any): void {
    this.selectedRoleAccess = role;
    this.isDeleteRoleAccessPopupOpen = true;
  }


  closeDeleteRoleAccessPopup(): void {
    this.selectedRoleAccess = null;
    this.isDeleteRoleAccessPopupOpen = false;
  }


  confirmDeleteRoleAccess(): void {
    if (!this.selectedRoleAccess?.id) return;

    this.roleService.deleteRoleAccess(this.selectedRoleAccess.id).subscribe({
      next: (res) => {
        this.alertService.showAlert(res.message || 'Deleted successfully');
        this.closeDeleteRoleAccessPopup();
        this.loadRoleAccessSummary(); // reload table
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  userList: any[] = [];

loadUsers(): void {
  this.userService.getAllUsers().subscribe({
    next: (res) => {
      this.userList = res;
      this.cdr.detectChanges(); // ✅
    },
    error: (err) => console.error('Failed to fetch users', err)
  });
}


  isCreateUserPopupOpen = false;

  newUser = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    assignedRoles: [''],
    role: ''
  };

  openCreateUserPopup() {
    this.loadRoleAccessSummary();
    this.isCreateUserPopupOpen = true;
  }

  closeCreateUserPopup() {
    this.isCreateUserPopupOpen = false;
    this.resetForm();
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message || 'User created successfully', "success");
        this.closeCreateUserPopup();
        this.loadUsers();

      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'User creation failed';
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }

  resetForm() {
    this.newUser = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      assignedRoles: [''],
      role: ''
    };
  }


  selectedUserToUpdate: any = null;
  isUpdateUserPopupOpen = false;

  openUpdateUserPopup(user: any) {
    this.selectedUserToUpdate = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      password: '',
      confirmPassword: '',
      assignedRoles: [...user.assignedRoles],
      role: user.role || ''
    };
    this.isUpdateUserPopupOpen = true;
  }

  closeUpdateUserPopup() {
    this.isUpdateUserPopupOpen = false;
    this.selectedUserToUpdate = null;
  }

  updateUser() {

    const updatedData = {
      userName: this.selectedUserToUpdate.userName,
      email: this.selectedUserToUpdate.email,
      password: this.selectedUserToUpdate.password,
      confirmPassword: this.selectedUserToUpdate.confirmPassword,
      assignedRoles: this.selectedUserToUpdate.assignedRoles,
      role: this.selectedUserToUpdate.role
    };

    this.userService.updateUser(this.selectedUserToUpdate.id, updatedData).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.closeUpdateUserPopup();
        this.loadUsers(); // if you want to refresh the list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  isDeleteUserPopupOpen = false;
  selectedUserIdToDelete: string | null = null;

  openDeleteUserPopup(userId: string) {
    this.selectedUserIdToDelete = userId;
    this.isDeleteUserPopupOpen = true;
  }

  closeDeleteUserPopup() {
    this.selectedUserIdToDelete = null;
    this.isDeleteUserPopupOpen = false;
  }

  deleteUser() {
    if (!this.selectedUserIdToDelete) return;

    this.userService.deleteUser(this.selectedUserIdToDelete).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message);
        this.closeDeleteUserPopup();
        this.loadUsers(); // reload list
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    });
  }


  approvalList: any[] = [];

  getApproval() {
    this.approvalService.getApproval().subscribe({
      next: (res: any) => {
        this.approvalList = res
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



  addApproval: any = {
    id: "",
    group: "",
    transaction: "",
    sequence: "",
    approvalDescription: "",
    role: "",
    status: true,
    emailNotification: ""
  }

  isAddApprovalPopupOpen: boolean = false;

  openAddApproval() {
    this.loadGroups();
    this.loadRoleAccessSummary();
    this.isAddApprovalPopupOpen = true;
    this.addApproval = {
      id:"",
      group: "",
      transaction: "",
      sequence: "",
      approvalDescription: "",
      role: "",
      status: true,
      emailNotification: false
    }
  }

  closeAddApproval() {
    this.isAddApprovalPopupOpen = false;
  }

  createNewApproval() {
    this.approvalService.createNewApproval(this.addApproval).subscribe({
      next: (res: any) => {
        this.alertService.showAlert(res.message, "success")
        this.closeAddApproval();
        this.getApproval();
      },
      error: (err) => {
        const errorMsg = err?.error?.message;
        this.alertService.showAlert(errorMsg, "error");
      }
    })
  }

  groupList: any[] = [];

  loadGroups(): void {
    this.masterService.getGroups().subscribe({
      next: (data) => {
        this.groupList = data;
        ;
      },
      error: (err) => {
        console.error('Failed to load groups', err);
      }
    });
  }


 isEditApprovalPopupOpen: boolean = false;


closeEditApproval() {
  this.isEditApprovalPopupOpen = false;
}

openEditApproval(approval: any): void {
  this.loadGroups();
  this.loadRoleAccessSummary();
  this.addApproval = { ...approval }; // Shallow copy
  this.isEditApprovalPopupOpen = true;
}


updateApproval() {
  this.approvalService.updateApproval(this.addApproval.id, this.addApproval).subscribe({
    next: (res: any) => {
      this.alertService.showAlert(res.sucess, "success");
      this.closeEditApproval();
      this.getApproval();
    },
    error: (err) => {
      const errorMsg = err?.error?.message;
      this.alertService.showAlert(errorMsg, "error");
    }
  });
}


isApprovalDeletePopup:boolean=false;

selectedApprovalIdToDelete:any='';

openDeleteApprovalPopup(approval:any){
  this.selectedApprovalIdToDelete=approval.id;
  this.isApprovalDeletePopup=true;
}

closeDeleteApprovalPopup(){
  this.isApprovalDeletePopup=false
}

deleteApproval(){
  this.approvalService.deleteApproval(this.selectedApprovalIdToDelete).subscribe({
    next:(res:any)=>{
      this.alertService.showAlert(res.message,"success")
      this.closeDeleteApprovalPopup();
      this.getApproval();
    },
    error:(err)=>{
      this.alertService.showAlert(err,"error")
    }
  })
}

}





