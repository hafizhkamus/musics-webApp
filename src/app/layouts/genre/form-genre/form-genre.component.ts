import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GenreService } from 'src/app/services/genre-service/genre.service';
import swal from 'sweetalert';
import { Genre } from 'src/app/services/genre-service/genre';

@Component({
  selector: 'app-form-genre',
  templateUrl: './form-genre.component.html',
  styleUrls: ['./form-genre.component.scss']
})
export class FormGenreComponent implements OnInit {

  id : string;
  form : FormGroup;

  constructor(private _service : GenreService, private _router : Router, private activateRouter: ActivatedRoute) { 
    this.form = new FormGroup({
      "idGenre" : new FormControl(null, [Validators.required]),
      "namaGenre" : new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {

    this.activateRouter.params.subscribe( rute => {
      this.id = rute.id;
      this._service.dataGenreById(this.id).subscribe( data => {
        this.form.get("idGenre").setValue( data.idGenre);
        this.form.get("namaGenre").setValue(data.namaGenre);
      }, error => {
        swal("Data Empty");
      });
    });
    
  }

  save(): void{
    console.log(this.form.value);
    const prov = new Genre();
    prov.idGenre = this.form.value.idGenre;
    prov.namaGenre = this.form.value.namaGenre;
    this._service.insertGenre(prov).subscribe((data) => {
      swal("Data Saved!", "list-artis has been updated", "success");
      this._router.navigate(["/genre"]);
    }, error => {
      swal("Cannot insert data", "your data in unable to save", "error");
    });
  }


}
