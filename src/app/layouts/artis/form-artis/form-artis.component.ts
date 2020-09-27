import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArtisService } from 'src/app/services/artis-service/artis.service';
import { Router, ActivatedRoute } from '@angular/router';
import  swal from 'sweetalert';
import { Artis } from 'src/app/services/artis-service/artis';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-artis',
  templateUrl: './form-artis.component.html',
  styleUrls: ['./form-artis.component.scss']
})
export class FormArtisComponent implements OnInit {

  id : string;
  form : FormGroup;

  selectedFiles : FileList;
  currentFile: File;
  progress : number;

  constructor(private _service : ArtisService, private _router : Router, private activateRouter: ActivatedRoute) {
    this.form = new FormGroup({
      "idArtis" : new FormControl(null, [Validators.required]),
      "namaArtis" : new FormControl(null, [Validators.required]),
      "url" : new FormControl(null, [Validators.required]),
      "keterangan" : new FormControl(null, [Validators.required])
    });
   }

  ngOnInit(): void {

    this.activateRouter.params.subscribe( rute => {
      this.id = rute.id;
      this._service.dataArtisById(this.id).subscribe( data => {
        this.form.get("idArtis").setValue( data.idArtis);
        this.form.get("namaArtis").setValue(data.namaArtis);
        this.form.get("url").setValue(data.url);
        this.form.get("keterangan").setValue(data.keterangan);
      }, error => {
        swal("Data Empty");
      });
    });

  }
  

  save(): void{
    console.log(this.form.value);
    const prov = new Artis();
    prov.idArtis = this.form.value.idArtis;
    prov.namaArtis = this.form.value.namaArtis;
    prov.keterangan = this.form.value.keterangan;
    prov.url = this.form.value.url;
    this._service.insertArtis(prov).subscribe((data) => {
      this.upload;
      swal("Data Saved!", "list-artis has been updated", "success");
      this._router.navigate(["/artis"]);
    }, error => {
      swal("Cannot insert data", "your data in unable to save", "error");
    });
  }

  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  upload(){
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this._service.upload(this.currentFile).subscribe(
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
