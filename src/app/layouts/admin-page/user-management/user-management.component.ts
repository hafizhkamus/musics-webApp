import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../../services/user-management/user-management.service';
import { Akun } from '../../../services/user-management/akun';
import { Roles } from '../../../services/user-management/roles';
import swal from 'sweetalert';
import { CheckingService } from './checking/checking.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  checked : string = "Y";
  
  listAkun : Akun[];

  listRole : Roles[];

  constructor(private _service : UserManagementService, private checking : CheckingService) { }

  ngOnInit(): void {

    this._service.dataAkun().subscribe( (data ) =>{
      this.listAkun = data
    }, error => {
      swal("Cannot catch data", "data is invalid indeed", "error");
    });

    this._service.dataRoles().subscribe( (data ) =>{
      this.listRole = data
    }, error => {
      swal("Cannot catch data", "data is invalid indeed", "error");
    });

  }

    check(idUser : string): boolean{
      return this.checking.checkingSuperAdmin(idUser);
    }

  test(param : string){
    console.log(this.listAkun);
    if(param != null){
      return true;
    } else {
      return false;
    }
  }

}
