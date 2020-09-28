import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Artis } from '../../services/artis-service/artis';
import { ArtisService } from '../../services/artis-service/artis.service';
import swal from 'sweetalert';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-artis',
  templateUrl: './artis.component.html',
  styleUrls: ['./artis.component.scss']
})
export class ArtisComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement : DataTableDirective;
  dtOptions : any;
  dtTrigger : Subject<any> = new Subject();

  searchArtis : FormGroup;

  listArtis : Artis[];

  constructor(private _service : ArtisService, private config : NgbTabsetConfig) { 

      // customize default values of tabsets used by this component tree
      config.justify = 'center';
      config.type = 'tabs';
  }

  ngOnInit(): void {

    this.searchArtis = new FormGroup({
      namaArtis: new FormControl('')
    });

    this._service.dataArtis().subscribe( (data ) =>{
      swal("Got Data!", "Artis data access", "success");
      this.listArtis = data
    }, error => {
      swal("Cannot catch data", "data is invalid indeed", "error");
    });

    const that = this;
    this.dtOptions = {
      ajax : (dataTablesParameters: any, callback) => {
        const parameters = new Map<string, any>();
        parameters.set('namaArtis', this.searchArtis.controls.namaArtis.value)
        that._service.getAllArtis(parameters, dataTablesParameters).subscribe( resp => {
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
        title : 'Id Artis',
        data : 'idArtis',
        orderable : false
      },
    {
      title: 'Nama Artis',
      data : 'namaArtis'
    },
    {
      title: 'Laman Website',
      data : 'url'
    },
    {
      title : 'Keterangan',
      data : 'keterangan'
    },
    {
      title : 'action',
      orderable: false,
      render(data, type, row){
        return `<a href="editartis/${row.idArtis}" class="btn btn-dark btn-default edit" data-element-id="${row.idArtis}">
        Edit</a>`;
      }
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

}
