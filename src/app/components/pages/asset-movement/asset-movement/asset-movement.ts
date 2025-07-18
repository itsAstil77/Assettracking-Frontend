import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Asset } from '../../../services/asset/asset';

@Component({
  selector: 'app-asset-movement',
  imports: [RouterModule,CommonModule],
  templateUrl: './asset-movement.html',
  styleUrl: './asset-movement.css'
})
export class AssetMovement implements OnInit {

  constructor(private assetService:Asset){}

  ngOnInit(): void {
    this.loadAssetMovement();
    
  }

   assetMovements: any[] = [];

   loadAssetMovement(){
    this.assetService.getAssetMovementSummary(1,10).subscribe({
      next:(res:any)=>{
        console.log(res.message)

      }
    })
   }

}
