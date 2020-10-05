import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service : AuthService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.service.logout;
  }

  onLogin( username: HTMLInputElement, password: HTMLInputElement ){
    this.service.login(username.value, password.value);
  }

}
