import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Asset } from '../../../services/asset/asset';
import { AssetDisposal } from '../../../services/asset-disposal/asset-disposal';
import { Router, RouterModule } from '@angular/router';
import { Alert } from '../../../services/alert/alert';

@Component({
  selector: 'app-create-asset-disposal',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-asset-disposal.html',
  styleUrl: './create-asset-disposal.css'
})
export class CreateAssetDisposal implements OnInit {

  ngOnInit(): void {
    this.loadAsset();
  }

  constructor(private assetService: Asset, private cdr: ChangeDetectorRef, private assetDisposals: AssetDisposal, private router: Router,
    private alertService: Alert
  ) { }


  assetList: any[] = [];

  loadAsset() {
    this.assetService.GetAsset().subscribe({
      next: (res: any) => {
        this.assetList = res;
        this.cdr.detectChanges();
      },
    })
  }


  selectAll: boolean = false;

  toggleAllAssets() {
    this.assetList.forEach(asset => asset.selected = this.selectAll);
  }

  toggleAsset(asset: any): void {
    asset.selected = !asset.selected;
  }


assetDisposal: any = {
  id: '',
  assetcode: '',
  disposedDate: '', // should be a valid ISO date string: e.g., new Date().toISOString()
  approvalworkflow: '',
  nextapprovalworkflow: '',
  lastapprovalworkflow: '',
  disposedby: '',
  remarks: '',
  referenceNumber: '',
  disposalRequestDate: '', // should also be a valid ISO date string
  disposalReason: '',
  requestedBy: '',
  status: '',
  assets: [],
  approvalSummary: [
    {
      status: '',
      requestApprovedBy: '',
      requestApprovedDate: '', // should be a valid ISO string or null
      remarks: ''
    }
  ]
};



//   disposeSelectedAssets() {
//     const selectedAssets = this.assetList.filter(asset => asset.selected);

//     this.assetDisposal.assets = selectedAssets;
  
//     this.assetDisposal.approvalSummary = [
//       {
//         status: '',
//         requestApprovedBy: '',
//         requestApprovedDate: '',
//         remarks: ''
//       }
//     ];

//     this.assetDisposals.disposeAssets(this.assetDisposal).subscribe({
//       next: (res: any) => {
//         this.alertService.showAlert(res.message);
//         this.router.navigate(['/asset-disposal']);
//       },
//       error: (err: any) => {
//         this.alertService.showAlert('Failed to dispose assets.', "error");
//       }
//     });
//   }
// }


disposeSelectedAssets() {
  const selectedAssets = this.assetList.filter(asset => asset.selected);

  this.assetDisposal.assets = selectedAssets;

  // Set disposalRequestDate and disposedDate to current ISO string if not already set
  const currentDate = new Date().toISOString();

  this.assetDisposal.disposalRequestDate = this.assetDisposal.disposalRequestDate || currentDate;
  this.assetDisposal.disposedDate = this.assetDisposal.disposedDate || currentDate;

  // You must ensure requestApprovedDate is a valid ISO date, not an empty string
  this.assetDisposal.approvalSummary = [
    {
      status: '',
      requestApprovedBy: '', // set your logged-in username or userId
      requestApprovedDate: currentDate,
      remarks: ''
    }
  ];

  // If backend expects a field called "disposal", include it
  this.assetDisposal.disposal = true;

  this.assetDisposals.disposeAssets(this.assetDisposal).subscribe({
    next: (res: any) => {
      this.alertService.showAlert(res.message);
      this.router.navigate(['/asset-disposal']);
    },
    error: (err: any) => {
      this.alertService.showAlert('Failed to dispose assets.', 'error');
    }
  });
}
}
