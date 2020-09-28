import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LablesRekaman } from 'src/app/services/lables-rekaman-service/lables-rekaman';
import { FormGroup, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LablesRekamanService } from 'src/app/services/lables-rekaman-service/lables-rekaman.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lables-rekaman',
  templateUrl: './lables-rekaman.component.html',
  styleUrls: ['./lables-rekaman.component.scss']
})
export class LablesRekamanComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement : DataTableDirective;
  dtOptions : any;
  dtTrigger : Subject<any> = new Subject();

  searchLabels : FormGroup;

  listLabels : LablesRekaman[];

  constructor(private _service : LablesRekamanService, private router: Router) { }

  ngOnInit(): void {

    this.searchLabels = new FormGroup({
      namaLabels: new FormControl('')
    });

    this._service.dataLabels().subscribe( (data ) =>{
      swal("Got Data!", "Artis data access", "success");
      this.listLabels = data
    }, error => {
      swal("Cannot catch data", "data is invalid indeed", "error");
    });

    const that = this;
    this.dtOptions = {
      ajax : (dataTablesParameters: any, callback) => {
        const parameters = new Map<string, any>();
        parameters.set('namaLabels', this.searchLabels.controls.namaLabels.value)
        that._service.getAllLabels(parameters, dataTablesParameters).subscribe( resp => {
          callback({
            recordsTotal : resp.recordsTotal,
            recordsFiltered : resp.recordFiltered,
            data : resp.data,
            draw : resp.draw
          });
        });
      },
      serverSide : true,
      processing : true,
      filter : false,
      columns: [{
        title : 'Id label',
        data : 'idLabel',
        orderable : false
      },
    {
      title: 'Nama Labels',
      data : 'namaLabels'
    },
    {
      title: 'Address',
      data : 'alamat'
    },
    {
      title: 'Contact',
      data : 'contactPerson'
    },
    {
      title: 'no',
      data : 'noTelp'
    },
    {
      title : 'action',
      orderable: false,
      render(data, type, row){
        return `<a routerLink="/editlabel/${row.idLabel}" class="btn btn-dark btn-default edit" data-element-id="${row.idLabel}">
        Edit</a>`;
      },
    },
    {
      title : 'delete',
      orderable: true,
      render(data, type, row){
        return `<button type="button" (onClick)="deleteGenre(${row.idLabel})" class="btn btn-dark btn-default edit" data-element-id="${row.idLabel}">
        Delete</button>`;
      },
    }]
    
    }

  }


  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  search(): void{
    this.dtElement.dtInstance.then((data: DataTables.Api)=> {
    data.draw();
     });
  }

  deleteGenre(id : number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You want to remove the Catalog!',
      icon: 'warning',
      // type: 'warning'
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
    console.log(`Delete Data By Id:` + id );
      this._service.deleteLabels(id).subscribe(resp => {
        console.log(resp);
        this.router.navigate[('/genre')];
      }, error => {
        console.error(error.message);
      });
    });
  }


}
