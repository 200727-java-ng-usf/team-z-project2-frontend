import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // orderArray; //init array

  constructor(private http: HttpClient) {
    console.log('Instantiating OrderService');
  }


  getAllOrders(){
    console.log("Fetching from backend...")
    //this might need to be responseType:Application/JSON //EDIT: set it to json
    console.log("URL: "+`${env.API_URL}/orders`);
    return this.http.get(`${env.API_URL}/orders`,{responseType:'json',observe:"response"});
  }

  getTargetOrder(id){ //test: working
    console.log("Fetching from backend...")
    let url = `${env.API_URL}/orders/id/` + id;
    console.log("URL: "+ url);
    return this.http.get(url,{responseType:'json',observe:"response"});
  }

  registerNewOrder(order:Order){ //test: working
    console.log('Registering new order... ');
    console.log(`Sending ${order}, to ${env.API_URL}/orders`);
    //here are the REST targets
    return this.http.post(`${env.API_URL}/orders`, order, {
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response' 
    })
    
  }

  deleteTargetOrder(id){ //untested
    console.log("Deleting...")
    let url = `${env.API_URL}/orders/id/` + id;
    console.log("URL: "+ url);
    return this.http.delete(url,{responseType:'json',observe:"response"});
  }

  updateTargetOrder(order:Order){ //untested
    console.log("Updating...")
    let url = `${env.API_URL}/orders`;
    console.log("URL: "+ url);
    return this.http.put(url,order,{responseType:'json',observe:"response"});
  }


}