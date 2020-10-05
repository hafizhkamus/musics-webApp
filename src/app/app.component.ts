import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'music-albums-webapp';

  links = [
    {
      link:'/save-artis',
      name:'artis'
    },
    {
      link:'/save-lagu',
      name:'lagu'
    },
    {
      link:'/save-albums',
      name:'albums'
    },
    {
      link:'/save-genre',
      name:'genre'
    },
    {
      link:'/save-label-rekaman',
      name:'record lables'
    }
  ]

  constructor(public authService : AuthService){

  }

  onLogout(){
    this.authService.logout;
  }
}
