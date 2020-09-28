import { Component, OnInit } from '@angular/core';
import { LablesRekaman } from 'src/app/services/lables-rekaman-service/lables-rekaman';
import { Albums } from 'src/app/services/albums-service/albums';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Artis } from 'src/app/services/artis-service/artis';
import { ArtisService } from 'src/app/services/artis-service/artis.service';
import { AlbumsService } from 'src/app/services/albums-service/albums.service';
import { LablesRekamanService } from 'src/app/services/lables-rekaman-service/lables-rekaman.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-album',
  templateUrl: './form-album.component.html',
  styleUrls: ['./form-album.component.scss']
})
export class FormAlbumComponent implements OnInit {

  id : string;

  listArtis : Artis[];

  form : FormGroup;

  listAlbums : Albums[];

  listLabels : LablesRekaman[];

  selectedFiles : FileList;
  currentFile: File;
  progress : number;

  constructor(private _artisService : ArtisService,
    private _albumsService : AlbumsService,
    private _labelsService : LablesRekamanService,
    private _router : Router,
    private activatedRoute : ActivatedRoute) { 

      this.form = new FormGroup({
        "idAlbum" : new FormControl(null, [Validators.required]),
        "namaAlbums" : new FormControl(null, [Validators.required]),
        "idLabel" : new FormControl(null, [Validators.required]),
        "idArtis" : new FormControl(null, [Validators.required]),
        "keterangan" : new FormControl(null, [Validators.required])
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
  
      this._labelsService.dataLabels().subscribe( (data ) =>{
        this.listLabels = data
      }, error => {
        swal("cannot catch data","data error", "error");
      });

      
    }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( rute => {
      this.id = rute.id;
      this._albumsService.dataAlbumsById(this.id).subscribe( data => {
        this.form.get("idAlbum").setValue( data.idAlbum);
        this.form.get("namaAlbums").setValue( data.namaAlbums);
        this.form.get("idLabel").setValue( data.idLabel);
        this.form.get("idArtis").setValue( data.idArtis);
        this.form.get("keterangan").setValue( data.keterangan);
      }, error => {
        swal("data kosong");
      });
    });
    
  }

  save(): void{
    console.log(this.form.value);
    const kabs = new Albums();
    kabs.idAlbum = this.form.value.idAlbum;
    kabs.namaAlbums = this.form.value.namaAlbums;
    kabs.idLabel = this.form.value.idLabel;
    kabs.idArtis = this.form.value.idArtis;
    kabs.keterangan   = this.form.value.keterangan;
    this._albumsService.insertAlbums(kabs).subscribe((data) => {
      console.log(data);
      swal("Data Saved", "list kecamatan has been updated", "success");
      this._router.navigate(["/albums"]);
    }, error => {
      swal("cannot input data", "your data is invalid", "error");
    });
  }


  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  upload(){
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this._albumsService.upload(this.currentFile).subscribe(
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
