import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Masters {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<any[]> {
    return this.http.get<any[]>('Group/summary'); // base URL handled by interceptor
  }

  createGroup(groupData: any): Observable<any> {
    return this.http.post<any[]>('Group/Create', groupData);
  }

  updateGroup(id: string, updateGroupForm: any): Observable<any> {
    return this.http.put<any>(`Group/update/${id}`, updateGroupForm);
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(`Group/delete/${id}`);
  }



  getCompanyByGroupId(groupId: string): Observable<any[]> {
  return this.http.get<any[]>(`companies/company-summary?GroupId=${groupId}`);
}


  getSitesByCompanyId(companyId: string): Observable<any[]> {
    return this.http.get<any[]>(`sites/Getsitesbycompany?CompanyId=${companyId}`);
  }

  createSite(data: any): Observable<any> {
  return this.http.post('sites', data);
}

updateSite(site: any): Observable<any> {
  return this.http.put(`sites/${site.id}`, site);
}


deleteSite(siteId: string): Observable<any> {
  return this.http.delete(`sites/${siteId}`);
}


getBuildingsBySiteId(siteId: string): Observable<any[]> {
  return this.http.get<any[]>(`Building/Getbuildingsbysites?SiteId=${siteId}`);
}


createBuilding(building: any): Observable<any> {
  return this.http.post<any>('Building/create', building);
}

updateBuilding(building: any): Observable<any> {
  return this.http.put(`Building/update/${building.id}`, building);
}

deleteBuilding(buildingId: string): Observable<any> {
  return this.http.delete(`Building/delete/${buildingId}`);

}


getFloorsByBuildingId(buildingId: string): Observable<any> {
  return this.http.get(`Floor/Getfloorbybuilding?BuildingId=${buildingId}`);
}


createFloor(data: any): Observable<any> {
  return this.http.post(`Floor/create`, data);
}

updateFloor(floor: any): Observable<any> {
  return this.http.put(`Floor/update/${floor.id}`, floor);

}


deleteFloor(floorId: string): Observable<any> {
  return this.http.delete(`Floor/delete/${floorId}`);

}

getRoomsByFloorId(floorId: string): Observable<any[]> {
  return this.http.get<any[]>(`Room/Getroombyfloor?FloorId=${floorId}`);
}

createRoom(data: any): Observable<any> {
  return this.http.post(`Room/create`, data);

}

updateRoom(room: any): Observable<any> {
  return this.http.put(`Room/update/${room.id}`, room);

}


deleteRoom(roomId: string): Observable<any> {
  return this.http.delete(`Room/delete/${roomId}`);
}

}