import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
    console.log('Instantiating ItemService');
  }


  getAllItems(){
    console.log("Fetching from backend...")
    //this might need to be responseType:Application/JSON //EDIT: set it to json
    console.log("URL: "+`${env.API_URL}/items`);
    return this.http.get(`${env.API_URL}/items`,{responseType:'json',observe:"response"});
  }

  getTargetItem(id){ //test: working
    console.log("Fetching from backend...")
    let url = `${env.API_URL}/items/id/` + id;
    console.log("URL: "+ url);
    return this.http.get(url,{responseType:'json',observe:"response"});
  }

  registerNewItem(item:Item){ //test: working
    console.log('Registering new item... ');
    console.log(`Sending ${item}, to ${env.API_URL}/items`);
    //here are the REST targets
    return this.http.post(`${env.API_URL}/items`, item, {
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response' 
    })
    
  }

  deleteTargetItem(id){ //untested
    console.log("Deleting...")
    let url = `${env.API_URL}/items/id/` + id;
    console.log("URL: "+ url);
    return this.http.delete(url,{responseType:'json',observe:"response"});
  }

  updateTargetItem(item:Item){ //untested
    console.log("Updating...")
    let url = `${env.API_URL}/items`;
    console.log("URL: "+ url);
    return this.http.put(url,item,{responseType:'json',observe:"response"});
  }
}
