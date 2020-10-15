import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management/user-management.service';
import { CheckingService } from '../user-management/checking/checking.service';
import { ActivatedRoute } from '@angular/router';
import { Akun } from 'src/app/services/user-management/akun';
import swal from 'sweetalert';
import { FormGroup, FormControl } from '@angular/forms';
import { Roles } from 'src/app/services/user-management/roles';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id : string;

  akun : Akun[];

  listRole : Roles[];

  form : FormGroup;

  constructor(
    private service : UserManagementService,
    private checkingService : CheckingService,
    private activateRoute : ActivatedRoute) { 
    }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl('')
    });

    this.service.dataRoles().subscribe( (data ) =>{
      this.listRole = data
    }, error => {
      swal("Cannot catch data", "data is invalid indeed", "error");
    });

    this.activateRoute.params.subscribe( rute => {
      this.id = rute.id;
      this.service.dataAkunByID(this.id).subscribe( data => {
        this.akun = data;
        console.log(data)
      }, error => {
        swal("Cannot catch data", "error");
      })
    })

  }

  ambilAlbums(): void{
    const id = this.form.get("id").value;
    this.service.dataAkunByID(id).subscribe( data => {
      this.akun = data;
    })
  }

  check(id : string): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkingService.checkingSuperAdmin(id)
    .pipe(map(data =>{
      if(data.isCheck != false){
        return true;
      } else{
        console.log("error");
      }
    }))
  }

}
