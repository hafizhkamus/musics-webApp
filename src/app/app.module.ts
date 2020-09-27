import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { ArtisComponent } from './layouts/artis/artis.component';
import { FormArtisComponent } from './layouts/artis/form-artis/form-artis.component';
import { GenreComponent } from './layouts/genre/genre.component';
import { FormGenreComponent } from './layouts/genre/form-genre/form-genre.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtisComponent,
    FormArtisComponent,
    GenreComponent,
    FormGenreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
