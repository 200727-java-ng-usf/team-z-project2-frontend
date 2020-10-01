import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { Order } from '../models/order';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // orderArray; //init array

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('Instantiating OrderService');
  }


  getAllOrders(){
    console.log("Fetching from backend...")
    //this might need to be responseType:Application/JSON //EDIT: set it to json
    console.log("URL: "+`${env.API_URL}/orders`);
    return this.http.get(`${env.API_URL}/orders`,{responseType:'json',observe:"response"});
  }

  getAllOrdersByUser() {
    let userId = this.authService.currentUserValue.id;
    return this.http.get(`${env.API_URL}/orders/userId/` + userId,{responseType:'json',observe:"response"});
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

  addToCart(item) { // move this wherever. Untested

    if(!this.authService.currentUserValue){
      alert("You must be logged in to do that!");
      return;
    }

    console.log('Adding to cart...');
    
    this.authService.currentUserValue.itemCount += 1;
    console.log(this.authService.currentUserValue.price);
    let priceNum = this.authService.currentUserValue.price + parseFloat(item.price);
    this.authService.currentUserValue.price = priceNum; // Reassign total to include item just added
    console.log('updated priceNum: ' + priceNum);
    console.log("Item added: id "+item.id);
    console.log("User: "+this.authService.currentUserValue.username);
    console.log("Total: "+ priceNum);
    console.log("# items: "+this.authService.currentUserValue.itemCount);

    //NOTES: (Taking different approach for the sake of time...) -DR

    // below should access the user that is logged in
    // // let authUser = this.authService.currentUserValue;
    // console.log(authUser);
    // console.log(authUser.username);

    // How to access the item that was clicked on?
    
    // if no order with current user as field exists...
      // Use OrderService below. May have to create method that is the 
      // response from /orders/user-id/{id}
      
    // if (true) { // replace the word true with logic.

      // CREATE new order.
      // user field should be "authUser".

      // CREATE orderedItem.
      // order field matches the order just created above.
      // item field matches item that the button is on.

    // } else { // if this block executes, user already has an order

      // locate the order that exists (what if the user has multiple orders?)
      // UPDATE that order with the itemCount++ and the price += item's price
      // orderService.Update(updatedOrder)

      // CREATE an orderedItem with the same item_id as the item button is on and
      // same order_id as the order that exists (again, what if multiple orders?)

    // }
  }


}