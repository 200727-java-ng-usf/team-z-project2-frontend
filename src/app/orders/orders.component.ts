import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders = new Array;
  show = false; //for the display div
  orderFindForm: FormGroup;
  targetOrder = new Order;
  tgtOrder = new Array;
  
  constructor(private orderService:OrderService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    
    this.orderFindForm = this.formBuilder.group({
      id: ['', Validators.required]
    });
  }
  get formFields() {
    return this.orderFindForm.controls;
  }  
  
  showAllOrders(): void{
    //apparently we don't need to parse it.
      //if we try to parse it (again), we will have committed a cardinal sin
        //my punishment was 3 hours of my life gone forever. 
          //thank you typescript
    

    this.orderService.getAllOrders().subscribe( //get the stuff
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

            for( let i = 0; i < length ; i++){
              let newOrder = new Order();
              newOrder.$id = respJSON[i].id; //FIX THIS depending on what backend sends back
              newOrder.$user = respJSON[i].user;
              newOrder.$itemCount = respJSON[i].itemCount;
              newOrder.$price = respJSON[i].price;
              this.orders.unshift(newOrder); //adding order to array
              console.log('Added order with id of: '+ respJSON[i]["id"]);
            }
            console.log("Total orders added: "+this.orders.length);
          }
          
      },
      err=>{
          console.log(err.status);
      }
  );
    //then show the div
    this.revealOrders();
    // return orderArray;
  }

  showOrder(){
    let id = this.formFields.id.value;
    this.orderService.getTargetOrder(id).subscribe( //get the stuff
      resp=>{ //take the response (should be a json)
          
          this.tgtOrder.unshift(resp.body);
          
          console.log('0.id: '+ this.tgtOrder[0].id); //man this is so gross
          console.log('Response:'+resp.status);
          if(resp.status == 200){ 
            let targetOrder = new Order();
            targetOrder.$id = this.tgtOrder[0].id; //FIX THIS depending on what backend sends back
            targetOrder.$user = this.tgtOrder[0].user;
            targetOrder.$itemCount = this.tgtOrder[0].itemCount;
            targetOrder.$price = this.tgtOrder[0].price;
            console.log('Added order with id of: '+ this.tgtOrder[0]["id"]);
          }
      },
      err=>{
          console.log(err.status);
      }
  );
    this.revealOrders();
  }

  revealOrders(){ //show toggler
    if(this.show==false){
      this.show=true;
    } 
  }

}
