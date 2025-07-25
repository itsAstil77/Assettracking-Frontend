import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AssetDisposal } from '../../../services/asset-disposal/asset-disposal';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-disposal-request',
  imports: [CommonModule,RouterModule],
  templateUrl: './asset-disposal-request.html',
  styleUrl: './asset-disposal-request.css'
})
export class AssetDisposalRequest implements OnInit{

  ngOnInit(): void {

    this.loadSummaryDisposalGetById();
    this.loadDisposalDetails();
    
  }

  constructor(private assetDisposalService:AssetDisposal,private route: ActivatedRoute,private cdr: ChangeDetectorRef){}


 selectedRole: string = "Request";

 DisposalData:any;

 loadSummaryDisposalGetById(){
  const id = this.route.snapshot.paramMap.get('id')
  if(id){
    this.assetDisposalService.assetDisposalGetById(id).subscribe({
      next:(res:any)=>{
        this.DisposalData=res;
        this.cdr.detectChanges();
      }
    })
  }
 }

 disposalDetails:any[]=[];

 loadDisposalDetails(){

  const id = this.route.snapshot.paramMap.get('id');

  if(id){
    this.assetDisposalService.getDisposalRequest(id).subscribe({
      next:(res:any)=>{
        this.disposalDetails=res;
        this.cdr.detectChanges();
      },
      error:()=>{

      }
    })
  }

 }
  
}
