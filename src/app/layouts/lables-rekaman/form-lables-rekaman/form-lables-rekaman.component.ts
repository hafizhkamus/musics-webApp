import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LablesRekamanService} from '../../../services/lables-rekaman-service/lables-rekaman.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { Albums } from 'src/app/services/albums-service/albums';
import { LablesRekaman } from 'src/app/services/lables-rekaman-service/lables-rekaman';

@Component({
  selector: 'app-form-lables-rekaman',
  templateUrl: './form-lables-rekaman.component.html',
  styleUrls: ['./form-lables-rekaman.component.scss']
})
export class FormLablesRekamanComponent implements OnInit {

  id : string;
  form : FormGroup;
  
  constructor(private labelsService : LablesRekamanService, private router : Router, private activateRoute : ActivatedRoute) { 
    this.form = new FormGroup({
      "idLabel" : new FormControl(null, [Validators.required]),
      "namaLabels" : new FormControl(null, [Validators.required]),
      "alamat" : new FormControl(null, [Validators.required]),
      "noTelp" : new FormControl(null, [Validators.required]),
      "contactPerson" : new FormControl(null, [Validators.required]),
      "url" : new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe( rute => {
      this.id = rute.id;
      this.labelsService.dataLabelsById(this.id).subscribe( data => {
        this.form.get("idGenre").setValue( data.idLabel);
        this.form.get("namaGenre").setValue(data.namaLabels);
        this.form.get("alamat").setValue(data.alamat);
        this.form.get("noTelp").setValue(data.noTelp);
        this.form.get("contactPerson").setValue(data.contactPerson);
        this.form.get("url").setValue(data.url);
      }, error => {
        swal("Data Empty");
      });
    });

  }

  save(): void{
    console.log(this.form.value);
    const prov = new LablesRekaman();
    prov.idLabel = this.form.value.idLabel;
    prov.namaLabels = this.form.value.namaLabels;
    prov.alamat = this.form.value.alamat;
    prov.noTelp = this.form.value.noTelp;
    prov.contactPerson = this.form.value.contactPerson;
    prov.url = this.form.value.url;
    this.labelsService.insertLabels(prov).subscribe((data) => {
      swal("Data Saved!", "list-artis has been updated", "success");
      this.router.navigate(["/genre"]);
    }, error => {
      swal("Cannot insert data", "your data in unable to save", "error");
    });
  }

}
