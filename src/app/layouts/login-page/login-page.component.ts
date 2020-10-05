import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public userName :string;
  public password :string;

  constructor(private service : AuthService) { }

  ngOnInit(): void {
  }

  onLogin(username: HTMLInputElement, password: HTMLInputElement){
    this.service.login(username.value, password.value);
  }

}
