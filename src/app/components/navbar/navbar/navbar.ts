import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {


  constructor(private eRef: ElementRef, private router: Router, private fb: FormBuilder) { }

  isTransactionExpanded = false;

  admina() {
    this.isTransactionExpanded = !this.isTransactionExpanded;
    this.setActive('admina');
  }

  closeAdminaPanel() {
    this.isTransactionExpanded = false;
  }

  passwordForm!: FormGroup;

  isSidebarCollapsed: boolean = true; // Default: Only icons are visible
  isAdminExpanded: boolean = false;
  isDropdownOpen = false;
  showUserDropdown: boolean = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleTransaction() {
    this.isTransactionExpanded = !this.isTransactionExpanded;
    this.setActive('transaction');
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Prevent immediate closing
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click')

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  loggedInUsername: string = '';

  ngOnInit(): void {

    const currentUrl = this.router.url;
    if (
      currentUrl.includes('/asset-movement') ||
      currentUrl.includes('/create-asset-movement')||
      currentUrl.includes('/asset-disposal')||
      currentUrl.includes('/create-asset-disposal')||
      currentUrl.includes('/asset-checkin')||
      currentUrl.includes('/asset-checkout')||
      currentUrl.includes('/asset-audit')||
      currentUrl.includes('/create-asset-audit')
    ) {
      this.activeMenuItem = 'transaction';
    }
    else if (currentUrl.includes('master')) this.activeMenuItem = 'master';
    else if (currentUrl.includes('report')) this.activeMenuItem = 'report';
    else if (currentUrl.includes('admin')) this.activeMenuItem = 'admin';
    else this.activeMenuItem = 'dashboard'; // fallback default
  }




  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
  }

  hideUserDropdown(): void {
    // small delay to let click handlers run before closing
    setTimeout(() => this.showUserDropdown = false, 200);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  goToProfile(): void {
    this.router.navigateByUrl('/my-profile');
  }



  support(): void {
    this.router.navigateByUrl('/support');
  }


  isUpdate: boolean = false;

  changePassword() {
    this.isUpdate = true;

  }
  closePopup() {
    this.isUpdate = false;
  }


  closeTransactionPanel() {
    this.isTransactionExpanded = false;
  }

  activeMenuItem: string = ''; // default active is dashboard

  setActive(menuItem: string): void {
    this.activeMenuItem = menuItem; // only one active at a time
    if (menuItem !== 'transaction') {
    this.isTransactionExpanded = false;
  }
  }
}
