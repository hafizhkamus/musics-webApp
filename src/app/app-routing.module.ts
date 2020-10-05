import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { ArtisComponent } from './layouts/artis/artis.component';
import { FormArtisComponent } from './layouts/artis/form-artis/form-artis.component';
import { GenreComponent } from './layouts/genre/genre.component';
import { FormGenreComponent } from './layouts/genre/form-genre/form-genre.component';
import { LaguComponent } from './layouts/lagu/lagu.component';
import { FormLaguComponent } from './layouts/lagu/form-lagu/form-lagu.component';
import { LablesRekamanComponent } from './layouts/lables-rekaman/lables-rekaman.component';
import { FormLablesRekamanComponent } from './layouts/lables-rekaman/form-lables-rekaman/form-lables-rekaman.component';
import { FormAlbumComponent } from './layouts/albums/form-album/form-album.component';
import { AlbumsComponent } from './layouts/albums/albums.component';
import { DetailAlbumsComponent } from './layouts/details/detail-albums/detail-albums.component';
import { DetailArtisComponent } from './layouts/details/detail-artis/detail-artis.component';
import { LoginPageComponent } from './layouts/login-page/login-page.component';
import { AuthGuardService } from './services/auth/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component : HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'artis',
    component: ArtisComponent
  },
  {
    path: 'save-artis',
    component : FormArtisComponent
  },
  {
    path: 'editartis/:id',
    component : FormArtisComponent
  },
  {
    path: 'genre',
    component: GenreComponent
  },
  {
    path: 'save-genre',
    component : FormGenreComponent
  },
  {
    path: 'editgenre/:id',
    component : FormGenreComponent
  },
  {
    path: 'lagu',
    component: LaguComponent
  },
  {
    path: 'save-lagu',
    component : FormLaguComponent
  },
  {
    path: 'editlagu/:id',
    component : FormLaguComponent
  },
  {
    path: 'lables-rekaman',
    component: LablesRekamanComponent
  },
  {
    path: 'save-labels',
    component : FormLablesRekamanComponent
  },
  {
    path: 'editlabel/:id',
    component : FormLablesRekamanComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'save-albums',
    component : FormAlbumComponent
  },
  {
    path: 'editalbum/:id',
    component : FormAlbumComponent
  },
  {
    path: ':namaArtis/albums/:idArtis',
    component: DetailArtisComponent
  },
  {
    path: ':namaAlbums/lagu/:idAlbum',
    component: DetailAlbumsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
