import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Principal } from '../models/principal';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  currentUser: Principal;
  currentUserSub: Subscription;

  constructor(private authService: AuthService, private orderService: OrderService) { 
    this.currentUserSub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
  }

  // displayUserInfo(){
  //   this.currentUser.id;
  // }
  

  columnDefs = [
    { field: 'id', sortable: true, filter: true, resizable: true  },
    { field: 'timeCreated', sortable: true, filter: true, resizable: true },
    { field: 'itemCount', sortable: true, filter: true, resizable: true  },
    { field: 'price', sortable: true, filter: true, resizable: true  }
    
  ];

  rowData: any;
  orders = new Array;

  showAllOrdersByUser(): void{
    //apparently we don't need to parse it.
      //if we try to parse it (again), we will have committed a cardinal sin
        //my punishment was 3 hours of my life gone forever. 
          //thank you typescript
    

    this.orderService.getAllOrdersByUser().subscribe( //get the stuff
      resp=>{ //take the response (should be a json)
          console.log("resp.body: "+resp.body);
          // console.log("body length"+resp.body.length);
          // let respJSON = JSON.parse(resp.body);
          let respJSON = resp.body;
          console.log("json: "+respJSON);
          console.log('0.id: '+ respJSON[0].id); //THIS ONE RIGHT HERE. THIS WORKS
          let length = Object.keys(respJSON).length; 
          //this is cute. we can't just use .length in typescript. 
            //that's heresy. of course. why would you want to know the length of a json array? 
              //only heathens want that. you're not a heathen, are you? 
                //of course not. 
          console.log("length: "+ length); //(of course not)
          console.log('Response:'+resp.status);
          if(resp.status == 200){ //FIX THIS depending on returned code
            this.rowData = respJSON; //this assigns the json to the ag-grid table

            //this is currently unneeded, but we might can use the array later
            for( let i = 0; i < length ; i++){
              let newOrder = new Order();
              newOrder.$id = respJSON[i].id; //FIX THIS depending on what backend sends back
              newOrder.$timeCreated = respJSON[i].timeCreated.toLocaleString();
              newOrder.$itemCount = respJSON[i].itemCount;
              newOrder.$price = respJSON[i].price.toFixed(2);
              this.orders.unshift(newOrder); //adding order to array
              console.log('Added order with id of: '+ respJSON[i]["id"]);
            }
            // console.log("Total users added: "+this.users.length);
          }
          
      },
      err=>{
          console.log(err.status);
      }
  );
    }

}
