import { Component, OnInit } from '@angular/core';
import { Artis } from 'src/app/services/artis-service/artis';
import { Albums } from  'src/app/services/albums-service/albums';
import { AlbumsService } from  'src/app/services/albums-service/albums.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Genre } from 'src/app/services/genre-service/genre';
import { Lagu } from '../../../services/lagu-service/lagu';
import { LaguService } from '../../../services/lagu-service/lagu.service';
import { ArtisService } from 'src/app/services/artis-service/artis.service';
import { GenreService } from 'src/app/services/genre-service/genre.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-lagu',
  templateUrl: './form-lagu.component.html',
  styleUrls: ['./form-lagu.component.scss'],
  providers : [ArtisService, AlbumsService, GenreService, LaguService]
})
export class FormLaguComponent implements OnInit {

  id : string;

  listArtis : Artis[];

  form : FormGroup;

  listAlbums : Albums[];

  listGenre : Genre[];

  listLagu : Lagu[];

  selectedFiles : FileList;
  currentFile: File;
  progress : number;

  constructor(
    private _artisService : ArtisService,
    private _albumsService : AlbumsService,
    private _genreService : GenreService,
    private _laguService : LaguService,
    private router : Router,
    private activateRoute : ActivatedRoute
  ) { 

    this.form = new FormGroup({
      "idLagu" : new FormControl(null, [Validators.required]),
      "judul" : new FormControl(null, [Validators.required]),
      "durasi" : new FormControl(null, [Validators.required]),
      "idArtis" : new FormControl(null, [Validators.required]),
      "idAlbum" : new FormControl(null, [Validators.required]),
      "idGenre" : new FormControl(null, [Validators.required])
    });

    this._laguService.dataLagu().subscribe( (data ) =>{
      this.listLagu = data
    }, error => {
      swal("cannot catch data", "data error", "error");
    });

    this._artisService.dataArtis().subscribe( (data ) =>{
      this.listArtis = data
    }, error => {
      swal("cannot catch data", "data error", "error");
    });

    this._albumsService.dataAlbums().subscribe( (data ) =>{
      this.listAlbums = data
    }, error => {
      swal("cannot catch data","data error", "error");
    });

    this._genreService.dataGenre().subscribe( (data ) =>{
      this.listGenre = data
    }, error => {
      swal("cannot catch data","data error", "error");
    });

    
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe( rute => {
      this.id = rute.id;
      this._laguService.dataLaguById(this.id).subscribe( data => {
        this.form.get("idLagu").setValue( data.idLagu);
        this.form.get("judul").setValue( data.judul);
        this.form.get("durasi").setValue( data.durasi);
        this.form.get("idArtis").setValue( data.idArtis);
        this.form.get("idAlbum").setValue( data.idAlbum);
        this.form.get("idGenre").setValue( data.idGenre);
      }, error => {
        swal("data kosong");
      });
    });

  }

  save(): void{
    console.log(this.form.value);
    const kabs = new Lagu();
    kabs.idLagu = this.form.value.idLagu;
    kabs.judul = this.form.value.judul;
    kabs.durasi = this.form.value.durasi;
    kabs.idArtis = this.form.value.idArtis;
    kabs.idAlbum = this.form.value.idAlbum;
    kabs.idGenre   = this.form.value.idGenre;
    this._laguService.insertLagu(kabs).subscribe((data) => {
      console.log(data);
      swal("Data Saved", "list kecamatan has been updated", "success");
      this.router.navigate(["/list-kecamatan"]);
    }, error => {
      swal("cannot input data", "your data is invalid", "error");
    });
  }

  ambilAlbums(): void{
    const idArtis = this.form.get("idArtis").value;
    this._albumsService.dataAlbumsByArtis(idArtis).subscribe( data => {
      this.listAlbums = data;
    })
  }

  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  upload(){
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this._laguService.upload(this.currentFile).subscribe(
      event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded /event.total);
        } else if (event instanceof HttpResponse) {
            console.log(event.body);
        }
      }, err => {
        this.progress = 0;
        swal("cannot upload file");
        this.currentFile = undefined;
      });

      this.selectFile = undefined
  }

}
