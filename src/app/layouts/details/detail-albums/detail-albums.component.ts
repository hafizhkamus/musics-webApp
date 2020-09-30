import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Albums } from 'src/app/services/albums-service/albums';
import { AlbumsService } from 'src/app/services/albums-service/albums.service';
import { LaguService } from 'src/app/services/lagu-service/lagu.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { Lagu } from 'src/app/services/lagu-service/lagu';

@Component({
  selector: 'app-detail-albums',
  templateUrl: './detail-albums.component.html',
  styleUrls: ['./detail-albums.component.scss']
})
export class DetailAlbumsComponent implements OnInit {

  idAlbum : string;

  form : FormGroup;

  listAlbums : Albums;

  listLagu : Lagu[];

  constructor(private albumsService : AlbumsService, private laguService : LaguService,
    private router : Router, private activatedRoute : ActivatedRoute) { 

      // this.albumsService.dataAlbums().subscribe( (data ) =>{
      //   this.listAlbums = data
      // }, error => {
      //   swal("cannot catch data","data error", "error");
      // });


      // this.laguService.dataLagu().subscribe( (data ) =>{
      //   this.listLagu = data
      // }, error => {
      //   swal("cannot catch data","data error", "error");
      // });
    }

  ngOnInit(): void {

    this.form = new FormGroup({
      idAlbum: new FormControl('')
    });

    this.activatedRoute.params.subscribe( rute => {
      this.idAlbum = rute.idAlbum;
      this.laguService.dataLagusByAlbums(this.idAlbum).subscribe( data => {
        this.listLagu = data;
      }, error => {
        swal("data kosong");
      });
    });


    this.activatedRoute.params.subscribe( rute => {
      this.idAlbum = rute.idAlbum;
      this.albumsService.dataAlbumsById(this.idAlbum).subscribe( data => {
        this.listAlbums = data;
      }, error => {
        swal("data kosong");
      });
    });
  
  }

  ambilLagu(): void{
    const idAlbum = this.form.get("idAlbum").value;
    this.laguService.dataLagusByAlbums(idAlbum).subscribe( data => {
      this.listLagu = data;
    })
  }

}
