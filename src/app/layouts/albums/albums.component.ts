import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Albums } from 'src/app/services/albums-service/albums';
import { AlbumsService } from 'src/app/services/albums-service/albums.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement : DataTableDirective;
  dtOptions : any;
  dtTrigger : Subject<any> = new Subject();

  searchArtis : FormGroup;

  listAlbums : Albums[];

  constructor(private _service : AlbumsService, private router : Router) { }

  ngOnInit(): void {

    this.searchArtis = new FormGroup({
      namaAlbums: new FormControl('')
    });

    this._service.dataAlbums().subscribe( (data ) =>{
      swal("Got Data!", "Artis data access", "success");
      this.listAlbums = data
    }, error => {
      swal("Cannot catch data", "data is invalid indeed", "error");
    });

    const that = this;
    this.dtOptions = {
      ajax : (dataTablesParameters: any, callback) => {
        const parameters = new Map<string, any>();
        parameters.set('namaAlbums', this.searchArtis.controls.namaAlbums.value)
        that._service.getAllAlbums(parameters, dataTablesParameters).subscribe( resp => {
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
        title : 'Id Album',
        data : 'idAlbum',
        orderable : false
      },
    {
      title: 'Nama Albums',
      data : 'namaAlbums'
    },
    {
      title: 'Nama Artis',
      data : 'namaArtis'
    },
    {
      title: 'Nama Labels',
      data : 'namaLabels'
    },
    {
      title: 'keterangan',
      data : 'keterangan'
    },
    {
      title : 'action',
      orderable: false,
      render(data, type, row){
        return `<a routerLink="/editalbum/${row.idAlbum}" class="btn btn-dark btn-default edit" data-element-id="${row.idAlbum}">
        Edit</a>`;
      },
    },
    {
      title : 'delete',
      orderable: true,
      render(data, type, row){
        return `<button type="button" (onClick)="deleteGenre(null, true)" class="btn btn-dark btn-default edit" data-element-id="${row.idAlbum}">
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

  deleteGenre(data: Albums, isMultiple: boolean) {
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
      if (result.value) {
        if (!isMultiple) {
          console.log(`Delete Data By Id: ${data.idAlbum}`);
          this._service.deleteAlbums(data.idAlbum).subscribe(resp => {
            console.log(resp);
            this.router.navigate[('/genre')];
          }, error => {
            console.error(error.message);
          });
        } else {
          this.router.navigate[('/genre')];
        }
      }
    });
  }

}
