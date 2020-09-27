import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { ArtisComponent } from './layouts/artis/artis.component';
import { FormArtisComponent } from './layouts/artis/form-artis/form-artis.component';
import { GenreComponent } from './layouts/genre/genre.component';
import { FormGenreComponent } from './layouts/genre/form-genre/form-genre.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component : HomeComponent
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
    path: 'editartis',
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
    path: 'editgenre',
    component : FormGenreComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
