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
    //here are the REST targets
    return this.http.post(`${env.API_URL}/auth`, credentials, {
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response' // default is body (which refers to the body of the response)
    }).pipe( //from here on, referred to as 'piperroni'
      
      map(resp => {
        let principal = resp.body as Principal; // another form of casting (using the 'as' keyword)
        this.currentUserSubject.next(principal);
      })
    );

  }

  logout(): void {
    this.http.get(`${env.API_URL}/auth`); // invalidate the server http session
    this.currentUserSubject.next(null); // makes the UI aware that the user has signed out
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
  
}
