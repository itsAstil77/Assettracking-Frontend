
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reports } from '../../../services/reports/reports';

@Component({
  selector: 'app-report',
  imports: [FormsModule,CommonModule],
  templateUrl: './report.html',
  styleUrl: './report.css'
})
export class Report implements OnInit {

  constructor(private reportService:Reports,private cdr:ChangeDetectorRef){}

ngOnInit(): void {
 this.loadDepartment();
 this.loadCustodian();
}

departmentList:any[]=[];

loadDepartment(){
  this.reportService.getDepartment().subscribe({
    next:(res:any)=>{
      this.departmentList=res;
      this.cdr.detectChanges();
    }
  })

}
custodianList:any[]=[];

loadCustodian(){
  this.reportService.getCustodian().subscribe({
    next:(res:any)=>{
      this.custodianList=res;
       this.cdr.detectChanges();
    }
  })
}

assetReport={
  id:'',
  departments:'',
  custodians:''
}
}
