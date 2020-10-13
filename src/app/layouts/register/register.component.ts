import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  form : FormGroup;


  constructor(private _service : RegisterService, private formBuilder : FormBuilder, private router : Router) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username : this.formBuilder.control(null),
      keyword : this.formBuilder.control(null)
    });

  }


  saveUser(){
    const value = this.form.value;
    this._service.saveAdmin(value).subscribe(response => {
      if(response.status == 201){
        swal("Anda telah mendaftar", "success");
        this.router.navigate(["/login"]);
      }
    }, error =>{
      swal("Cannot register", "please check again your username or password", "Error")
    })
  }

}
