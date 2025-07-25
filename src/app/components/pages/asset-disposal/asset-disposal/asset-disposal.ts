import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssetMovement } from '../../../services/asset-movement/asset-movement';


@Component({
  selector: 'app-asset-disposal',
  imports: [RouterModule,CommonModule],
  templateUrl: './asset-disposal.html',
  styleUrl: './asset-disposal.css'
})
export class AssetDisposal implements OnInit {

  ngOnInit(): void {
    this.loadDisposalSummary();
  }

  constructor(private assetMovementService:AssetMovement,private cdr:ChangeDetectorRef){}

  disposalAsset:any[]=[];

  loadDisposalSummary(){
    this.assetMovementService.getAssetDisposal(1,10).subscribe({
      next:(res:any)=>{
        this.disposalAsset=res;
         this.cdr.detectChanges(); 
      }
    })
  }

}
