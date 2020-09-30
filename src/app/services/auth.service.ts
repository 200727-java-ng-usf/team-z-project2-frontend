import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //ROLES:
    //USER
    //MANAGER
    //ADMIN
    //INACTIVE

  private currentUserSubject: BehaviorSubject<Principal>
  currentUser$: Observable<Principal>
  constructor(private http: HttpClient) {
    console.log('Instantiating AuthService');
    this.currentUserSubject = new BehaviorSubject<Principal>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    console.log('AuthService instantiation complete.');
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  authenticate(username: string, password: string) {
    let role = '1'; //testing

    console.log('in authenticate()');
    // let credentials = { username, password }; //original
    let credentials = { username, password, role };
    console.log(`sending credentials, ${credentials}, to ${env.API_URL}/auth`);
    return this.http.post(`${env.API_URL}/auth`, credentials, {
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response' 
    }).pipe( 
      
      map(resp => {
        let principal = resp.body as Principal;
        //SHOPPING LOGIC:
          //we can add logic here to initialize shopping cart data in the currentuser object
            //then handle it through an order object within the user
              //for now, i've only updated fields in the principle
        principal.price = 0;
        principal.itemCount = 0;
        this.currentUserSubject.next(principal);
        console.log('Principle: '+principal);
        console.log('Current user: '+ this.currentUserSubject);


      })
    );

  }

  logout():boolean{
    // this.http.get(`${env.API_URL}/auth`); // invalidate the server http session
    
    this.currentUserSubject.next(null); // makes the UI aware that the user has signed out
    let response = this.http.get(`${env.API_URL}/auth`,{responseType:'json',observe:"response"});
    response.subscribe(
      resp=>{ 
          console.log('Response: '+resp.status);
          return true;
      },
      err=>{
          console.log(err.status);
          return false;
      }
    );
    return true;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
  
  isAdmin(): boolean{
    if(this.currentUserValue.role=='ADMIN'){
      return true;
    } else {
      return false;
    }
  }
  
}
