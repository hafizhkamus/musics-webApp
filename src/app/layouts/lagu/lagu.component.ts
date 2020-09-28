import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Lagu } from 'src/app/services/lagu-service/lagu';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { LaguService } from 'src/app/services/lagu-service/lagu.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lagu',
  templateUrl: './lagu.component.html',
  styleUrls: ['./lagu.component.scss']
})
export class LaguComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement : DataTableDirective;
  dtOptions : any;
  dtTrigger : Subject<any> = new Subject();

  searchLabels : FormGroup;

  listLagu : Lagu[];

  constructor(private _service : LaguService, private router : Router) { }

  ngOnInit(): void {

    this.searchLabels = new FormGroup({
      judul: new FormControl('')
    });

    this._service.dataLagu().subscribe( (data ) =>{
      swal("Got Data!", "Artis data access", "success");
      this.listLagu = data
    }, error => {
      swal("Cannot catch data", "data is invalid indeed", "error");
    });

    const that = this;
    this.dtOptions = {
      ajax : (dataTablesParameters: any, callback) => {
        const parameters = new Map<string, any>();
        parameters.set('judul', this.searchLabels.controls.judul.value)
        that._service.getAllLagu(parameters, dataTablesParameters).subscribe( resp => {
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
        title : 'Id lagu',
        data : 'idLagu',
        orderable : false
      },
    {
      title: 'judul lagu',
      data : 'judul'
    },
    {
      title: 'Nama Artis',
      data : 'namaArtis'
    },
    {
      title: 'Nama Albums',
      data : 'namaAlbums'
    },
    {
      title: 'Genre',
      data : 'namaGenre'
    },
    {
      title : 'action',
      orderable: false,
      render(data, type, row){
        return `<a routerLink="/editlagu/${row.idLagu}" class="btn btn-dark btn-default edit" data-element-id="${row.idLagu}">
        Edit</a>`;
      },
    },
    {
      title : 'delete',
      orderable: true,
      render(data, type, row){
        return `<button type="button" (onClick)="deleteGenre(${row.idLagu})" class="btn btn-dark btn-default edit" data-element-id="${row.idLagu}">
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
      this._service.deleteLagu(id).subscribe(resp => {
        console.log(resp);
        this.router.navigate[('/genre')];
      }, error => {
        console.error(error.message);
      });
    });
  }

}
