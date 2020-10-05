import { Component, OnInit } from '@angular/core';
import { ArtisService } from 'src/app/services/artis-service/artis.service';
import { AlbumsService } from 'src/app/services/albums-service/albums.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Albums } from 'src/app/services/albums-service/albums';
import { Artis } from 'src/app/services/artis-service/artis';
import swal from 'sweetalert';

@Component({
  selector: 'app-detail-artis',
  templateUrl: './detail-artis.component.html',
  styleUrls: ['./detail-artis.component.scss']
})
export class DetailArtisComponent implements OnInit {

  idArtis : string;

  form : FormGroup;

  listArtis : Artis;

  listAlbums : Albums[];

  constructor(private artisService : ArtisService, private albumsService : AlbumsService,
    private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      idArtis: new FormControl('')
    });

    this.activatedRoute.params.subscribe( rute => {
      this.idArtis = rute.idArtis;
      this.albumsService.dataAlbumsByArtis(this.idArtis).subscribe( data => {
        this.listAlbums = data;
      }, error => {
        swal("data kosong");
      });
    });


    this.activatedRoute.params.subscribe( rute => {
      this.idArtis = rute.idArtis;
      this.artisService.dataArtisById(this.idArtis).subscribe( data => {
        this.listArtis = data;
      }, error => {
        swal("data kosong");
      });
    });
    
  }

  
  ambilLagu(): void{
    const idArtis = this.form.get("idArtis").value;
    this.albumsService.dataAlbumsByArtis(idArtis).subscribe( data => {
      this.listAlbums = data;
    })
  }


}
