import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, from } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Genre } from '../../services/genre-service/genre';
import { GenreService } from '../../services/genre-service/genre.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement : DataTableDirective;
  dtOptions : any;
  dtTrigger : Subject<any> = new Subject();

  searchArtis : FormGroup;

  listGenre : Genre[];

  constructor(private _service : GenreService) { }

  ngOnInit(): void {

    this.searchArtis = new FormGroup({
      namaGenre: new FormControl('')
    });

    this._service.dataGenre().subscribe( (data ) =>{
      swal("Got Data!", "Artis data access", "success");
      this.listGenre = data
    }, error => {
      swal("Cannot catch data", "data is invalid indeed", "error");
    });

    const that = this;
    this.dtOptions = {
      ajax : (dataTablesParameters: any, callback) => {
        const parameters = new Map<string, any>();
        parameters.set('namaGenre', this.searchArtis.controls.namaGenre.value)
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
        title : 'Id Genre',
        data : 'idGenre',
        orderable : false
      },
    {
      title: 'Nama Genre',
      data : 'namaGenre'
    },
    {
      title : 'action',
      orderable: false,
      render(data, type, row){
        return `<a routerLink="/editgenre/${row.idGenre}" class="btn btn-dark btn-default edit" data-element-id="${row.idGenre}">
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
