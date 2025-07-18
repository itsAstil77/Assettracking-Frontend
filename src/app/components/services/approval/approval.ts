import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Approval {

  constructor(private http:HttpClient) { }

  getApproval(){
    return this.http.get(`ApprovalWorkflow/workflowsummary`)
  }
  createNewApproval(addApproval:any){
    return this.http.post(`ApprovalWorkflow/addWorkflow`,addApproval)
  }

  updateApproval(id:any,updateApproval:any){
    return this.http.put(`ApprovalWorkflow/updateworkflow?id=${id}`,updateApproval)
  }

  deleteApproval(id:any){
    return this.http.delete(`ApprovalWorkflow/deleteworkflow?id=${id}`)
  }
}
