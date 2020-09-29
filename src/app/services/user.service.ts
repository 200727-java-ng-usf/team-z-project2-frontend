//documentation
  //https://stackoverflow.com/questions/49800025/angular-5-httpclient-mapping-json-object-array-to-my-object-array


//REST methods:
  //GET - returns all users
  //PUT - updates a user by id
  //POST - creates a user
  //DELETE - tortures and kills a sinful user

  //Which method to get a specific user?
    //or even bother with it? we could just hold the json wherever and search it on the frontend


//duped from auth:
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // userArray; //init array

  constructor(private http: HttpClient) {
    console.log('Instantiating UserService');
  }


  getAllUsers(){
    console.log("Fetching from backend...")
    //this might need to be responseType:Application/JSON //EDIT: set it to json
    console.log("URL: "+`${env.API_URL}/users`);
    return this.http.get(`${env.API_URL}/users`,{responseType:'json',observe:"response"});
  }

  getTargetUser(id){ //test: working
    console.log("Fetching from backend...")
    let url = `${env.API_URL}/users/id/` + id;
    console.log("URL: "+ url);
    return this.http.get(url,{responseType:'json',observe:"response"});
  }

  registerNewUser(user:User){ //test: working
    console.log('Registering new user... ');
    console.log(`Sending ${user}, to ${env.API_URL}/users`);
    //here are the REST targets
    return this.http.post(`${env.API_URL}/users`, user, {
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response' 
    })
    
  }

  deleteTargetUser(id){ //untested
    console.log("Deleting...")
    let url = `${env.API_URL}/users/id/` + id;
    console.log("URL: "+ url);
    return this.http.delete(url,{responseType:'json',observe:"response"});
  }

  updateTargetUser(user:User){ //untested
    console.log("Updating...")
    let url = `${env.API_URL}/users`;
    console.log("URL: "+ url);
    return this.http.put(url,user,{responseType:'json',observe:"response"});
  }


}

// httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  // getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${env.API_URL}/users`);
  // }
  // getUsers() {
  //   console.log("Fetching from backend... ")
  //   var userArray;
  //   //currently is not mapped to an item object
  //   this.http.get(`${env.API_URL}/users`).subscribe(
  //     result => {
  //       this.userArray = result;
  //     }
  //   )
  //   console.log("Array[0] = "+userArray[0]); //debug test here
  // } 


  //HTTP GET
    //todo: include logic to prevent unauthorized buckaroos from trying to cowboy their way into the rds
  // getAllUsers() {
  //   console.log('Getting users...');

  //   //here are the REST targets
  //   return this.http.get(`${env.API_URL}/auth`{
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     observe: 'response' // default is body (which refers to the body of the response)
  //   }).pipe( //from here on, referred to as 'piperroni'
      
  //     map(resp => {
  //       let principal = resp.body as Principal; // another form of casting (using the 'as' keyword)
  //       this.currentUserSubject.next(principal);
  //     })
  //   );

  // }

    //doesn't work:
    // let usersJSON;
    // this.http.get(`${env.API_URL}/users`)
    //   .subscribe(data => usersJSON = data);
    // return usersJSON; //idk what this will be. a json? an array? a long string?

    //doesn't work:
  //   return this.http.get(`${env.API_URL}/users`, {
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     observe: 'response'
  // });