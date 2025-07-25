import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AssetMovement } from '../../../services/asset-movement/asset-movement';

@Component({
  selector: 'app-asset-movement-request',
  imports: [RouterModule, CommonModule],
  templateUrl: './asset-movement-request.html',
  styleUrl: './asset-movement-request.css'
})
export class AssetMovementRequest implements OnInit {

  constructor(private assetMovementService: AssetMovement, private route: ActivatedRoute,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.loadMovementDetails(); // fetch data

    this.loadSummaryMovementGetById();

  }


  selectedRole: string = "Request";

  movementDetails: any[] = [];

  loadMovementDetails(){

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.assetMovementService.getMovementRequest(id).subscribe({
        next: (res: any) => {
          this.movementDetails = res;
           this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    }
  }

  movementData: any;

  loadSummaryMovementGetById() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.assetMovementService.assetMovementGetById(id).subscribe({
        next: (res: any) => {
          this.movementData = res;
           this.cdr.detectChanges(); 
        }
      })
    }

  }
}