import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  order: Order = new Order;
  user: User = new User;

  constructor(private authService: AuthService,private orderService: OrderService) {
    console.log('Instantiating Checkout component...');
    //Casting the user data into an order object
      //we may need to move this depending on what the subscriptions/observables do
    // this.order = this.authService.currentUserValue as Order;
    this.order.user_id = this.authService.currentUserValue.id;
    this.order.price = this.authService.currentUserValue.price;
    this.order.itemCount = this.authService.currentUserValue.itemCount;
    
    //if we change how the tables work, we'll need to change this:
    
    // creating a new user object since angular is crying about casting again
        // this.order.user = this.authService.currentUserValue as User;

    this.user.id = this.authService.currentUserValue.id;
    this.user.username = this.authService.currentUserValue.username;
    this.user.role = this.authService.currentUserValue.role;
    this.order.user = this.user;

    // still throws an error...
      // for now, we can either just feed the backend the USER ID, instead of a full object
      // or somehow cowboy it into submission. 

   }

  ngOnInit(): void {
    
  }

  checkout(){
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

  }


}
