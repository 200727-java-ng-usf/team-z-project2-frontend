import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { OrderedItem } from '../models/ordereditem';

@Injectable({
  providedIn: 'root'
})
export class OrderedItemService {
  // orderedItemArray; //init array

  constructor(private http: HttpClient) {
    console.log('Instantiating OrderedItemService');
  }


  getAllOrderedItems(){
    console.log("Fetching from backend...")
    //this might need to be responseType:Application/JSON //EDIT: set it to json
    console.log("URL: "+`${env.API_URL}/ordereditems`);
    return this.http.get(`${env.API_URL}/ordereditems`,{responseType:'json',observe:"response"});
  }

  getTargetOrderedItem(id){ //test: working
    console.log("Fetching from backend...")
    let url = `${env.API_URL}/ordereditems/id/` + id;
    console.log("URL: "+ url);
    return this.http.get(url,{responseType:'json',observe:"response"});
  }

  registerNewOrderedItem(orderedItem:OrderedItem){ //test: working
    console.log('Registering new orderedItem... ');
    console.log(`Sending ${orderedItem}, to ${env.API_URL}/ordereditems`);
    //here are the REST targets
    return this.http.post(`${env.API_URL}/ordereditems`, orderedItem, {
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response' 
    })
    
  }

  deleteTargetOrderedItem(id){ //untested
    console.log("Deleting...")
    let url = `${env.API_URL}/ordereditems/id/` + id;
    console.log("URL: "+ url);
    return this.http.delete(url,{responseType:'json',observe:"response"});
  }

  updateTargetOrderedItem(orderedItem:OrderedItem){ //untested
    console.log("Updating...")
    let url = `${env.API_URL}/ordereditems`;
    console.log("URL: "+ url);
    return this.http.put(url,orderedItem,{responseType:'json',observe:"response"});
  }


}
