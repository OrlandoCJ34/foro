import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';

const URL = "https://devel.cdhidalgo.tecnm.mx/~iraic/foro-rest";

interface User {
  id:number,
  username:string,
  role:string
}
interface Login {
  user:User,
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private user:User = {id:0, username:'', role:''};
  private userObs = new BehaviorSubject<User>(this.user);
  userObs$ =this.userObs.asObservable();

  constructor(private http: HttpClient) { }
  
  setUser(user:User){
    this.user = user;
    this.userObs.next(this.user);
  }

  getUser(){
    return this.user;
  }

  login(user:string, pass:string){
    return this.http.get<Login>(URL+'/login',
      {params:{username:user, password:pass}});
  }
}