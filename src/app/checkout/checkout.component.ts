import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import {StorageService} from '../services/storage.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  order: Order = new Order;
  user: User = new User;

 constructor(
    private authService: AuthService,
    private orderService: OrderService, 
    private storageService: StorageService,
    private userService: UserService
    ) {
      

      console.log('Instantiating Checkout component...');

      //add price and itemcount from currentUserValue to the order
      //new:
      this.order.price = this.storageService.get("subtotal");
      this.order.itemCount = this.storageService.get("itemCount");
      
      //old:
      // this.order.price = this.authService.currentUserValue.price;
      // this.order.itemCount = this.authService.currentUserValue.itemCount;


      //take User object from session data and add that as well
      this.order.user = this.storageService.get("userData");

      //debug testing
      // console.log("Order price: "+this.order.price);
      // console.log("Order item count: "+this.order.itemCount);
      // console.log("Order User ID: "+ this.order.user.id);
      // console.log("Order User email: "+this.order.user.email);




      // //Casting the user data into an order object
      //   //we may need to move this depending on what the subscriptions/observables do
      // // this.order = this.authService.currentUserValue as Order;
      // this.order.user_id = this.authService.currentUserValue.id;
      // this.order.price = this.authService.currentUserValue.price;
      // this.order.itemCount = this.authService.currentUserValue.itemCount;
      // //if we change how the tables work, we'll need to change this:
      // // creating a new user object since angular is crying about casting again
      //     // this.order.user = this.authService.currentUserValue as User;
      // this.user.id = this.authService.currentUserValue.id;
      // this.user.username = this.authService.currentUserValue.username;
      // this.user.role = this.authService.currentUserValue.role;
      // // still throws an error...
      //   // for now, we can either just feed the backend the USER ID, instead of a full object
      //   // or somehow cowboy it into submission. 

   }

  ngOnInit(): void {
    
  }

  async checkout(){

    let user = await this.userService.getTargetUser(this.authService.currentUserValue.id).then(resp =>{ return resp;});
      console.log(user);

    let orderString = JSON.stringify(this.order);
    console.log("Order Data: "+orderString);

    this.orderService.registerNewOrder(this.order).subscribe(
      resp=>{ 
          console.log("Submitted!");
          console.log('Response: '+resp.status);
      },
      err=>{
          console.log(err.status);
      }
    );

      this.authService.currentUserValue.price = 0;
      this.authService.currentUserValue.itemCount = 0;

  }


}
