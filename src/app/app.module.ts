import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { ArtisComponent } from './layouts/artis/artis.component';
import { FormArtisComponent } from './layouts/artis/form-artis/form-artis.component';
import { GenreComponent } from './layouts/genre/genre.component';
import { FormGenreComponent } from './layouts/genre/form-genre/form-genre.component';
import { AlbumsComponent } from './layouts/albums/albums.component';
import { FormAlbumComponent } from './layouts/albums/form-album/form-album.component';
import { LablesRekamanComponent } from './layouts/lables-rekaman/lables-rekaman.component';
import { FormLablesRekamanComponent } from './layouts/lables-rekaman/form-lables-rekaman/form-lables-rekaman.component';
import { LaguComponent } from './layouts/lagu/lagu.component';
import { FormLaguComponent } from './layouts/lagu/form-lagu/form-lagu.component';
import { DetailAlbumsComponent } from './layouts/details/detail-albums/detail-albums.component';
import { DetailArtisComponent } from './layouts/details/detail-artis/detail-artis.component';
import { LoginPageComponent } from './layouts/login-page/login-page.component';
import { AuthGuardService } from './services/auth/auth-guard/auth-guard.service';
import { RegisterComponent } from './layouts/register/register.component';
import { RegisAdminComponent } from './layouts/admin-page/regis-admin/regis-admin.component';
import { UserManagementComponent } from './layouts/admin-page/user-management/user-management.component';
import { UserDetailsComponent } from './layouts/admin-page/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtisComponent,
    FormArtisComponent,
    GenreComponent,
    FormGenreComponent,
    AlbumsComponent,
    FormAlbumComponent,
    LablesRekamanComponent,
    FormLablesRekamanComponent,
    LaguComponent,
    FormLaguComponent,
    DetailAlbumsComponent,
    DetailArtisComponent,
    LoginPageComponent,
    RegisterComponent,
    RegisAdminComponent,
    UserManagementComponent,
    UserDetailsComponent
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
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
