import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:string = 'admin';
  pass:string = '';

  constructor(private rest: ApiRestService,
    private router: Router,
    private msg: ToastrService) { }

  ngOnInit(): void {
  }

  entrar(){
    this.rest.login(this.user, this.pass).subscribe(
      response => {
        this.rest.setUser(response.user);
        localStorage.setItem('token', response.token)
        this.router.navigate(['/home']);
        this.msg.success("Bienvenido");
      },
      error => {
        this.msg.error("Que putas intentabas hacer we", error.status)

      }
    );
  }
}