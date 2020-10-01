import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import {StorageService} from '../services/storage.service'
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

declare let $:any;

@Component({
  selector: 'app-hot-product',
  templateUrl: './hot-product.component.html',
  styleUrls: ['./hot-product.component.css']
})
export class HotProductComponent implements OnInit {

  isAddItem:boolean;
  items = new Array;
  targetItem = new Item;
  rowData: any;
  newItem = new Item();
  //new:
  userdash = '/userdashboard';
  itemCount:number = 0;
  subtotal:number = 0;

  constructor(
    private itemService:ItemService,
    public storage:StorageService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {

    var hotproduct = this.storage.get('hotproduct');

    this.isAddItem = false;

    if(hotproduct!= null){

     this.hotProduct = hotproduct;
    }

    this.buildItemArray();
    this.showAllItems();
    console.log(this.newItem.id);
    
  }

  

  public keywords:string;

  public hotProduct:any[] = [];

  showAllItems(): void{
    this.itemService.getAllItems().subscribe(
      resp=>{ 
          console.log("resp.body: "+resp.body);
          let respJSON = resp.body;
          let length = Object.keys(respJSON).length; 

          if(resp.status == 200){ //FIX THIS depending on returned code
            this.rowData = respJSON; //this assigns the json to the ag-grid table

            for( let i = 0; i < length ; i++){
              let newItem = new Item();
              newItem.$id = respJSON[i].id; //FIX THIS depending on what backend sends back
              newItem.$name = respJSON[i].name;
              newItem.$price = respJSON[i].price;
              newItem.$stock = respJSON[i].stock;
              newItem.$description = respJSON[i].description;
              newItem.$itemImageUrl = respJSON[i].itemImageUrl;
              newItem.$genre = respJSON[i].genre;
              this.items.unshift(newItem); //adding item to array
              console.log('Added item with id of: '+ respJSON[i]["id"]);
              
            }
            console.log("Total items added: "+this.items.length);
          }
          
      },
      err=>{
          console.log(err.status);
      }
  );
    // //then show the div
    // this.revealItems();
    // // return itemArray;
  }

doAdd(item:Item){
  this.isAddItem = true;
  this.hotProduct.push(item)
  this.storage.set('hotproduct',this.hotProduct);
  //new:
  this.subtotal += parseFloat(item.price);        //update subtotal
  this.itemCount++;                               //increase item count
  this.storage.set('itemCount', this.itemCount);  //update count to storage
  this.storage.set('subtotal', this.subtotal);    //and the subtotal

  console.log(this.subtotal);
}

deleteData(key){

  //can't figure this part out 
  //new:
  // let deletedItem = this.hotProduct[key];
  // this.subtotal -= parseFloat(key.price); //update subtotal
  // this.itemCount--;                               //decrease item count
  // this.storage.set('itemCount', this.itemCount);  //update count to storage
  // this.storage.set('subtotal', this.subtotal);    //and the subtotal

  this.hotProduct.splice(key,1);   // delete 1 item from position key

  this.storage.set('hotproduct',this.hotProduct);    // set new todolist in localstorage
  if(this.hotProduct == null){
    this.isAddItem = false;
  }


}


// instead, we can just send them straight back to their dashboard and checkout there
// added extra logic to add and delete to handle pricing and itemcount

submitOrder(){
  // this.orderService.addToCart(item);

  // asks auth service if theyre authenticated, and if not, alert them
    //if they are logged in, they redirect to their dashboard (checkout)
  if(this.authService.currentUserValue!=null){
    this.router.navigate(['/userdashboard']);
  } else {
    alert("You must be logged in!");
  }
  
}


buildItemArray(){
  this.itemService.getAllItems().subscribe(
    resp=>{ 
        console.log("resp.status: "+resp.status);
        let respJSON = resp.body;
        let length = Object.keys(respJSON).length; 
        if(resp.status == 200){ //FIX THIS depending on returned code
          // this.rowData = respJSON; //this assigns the json to the ag-grid table
          for( let i = 0; i < length ; i++){
            let newItem = new Item();
            newItem.$id = respJSON[i].id; //FIX THIS depending on what backend sends back
            newItem.$name = respJSON[i].name;
            newItem.$price = respJSON[i].price.toFixed(2);
            newItem.$stock = respJSON[i].stock;
            newItem.$description = respJSON[i].description;
            newItem.$itemImageUrl = respJSON[i].itemImageUrl;
            newItem.$genre = respJSON[i].genre;
            // newItem.btn = "test("+newItem.id+")"
            this.items.unshift(newItem); //adding item to array
            console.log('Added item with id of: '+ respJSON[i]["id"]);
          }
          console.log("Total items added: "+this.items.length);
        }
    },
    err=>{
        console.log(err.status);
    }
);}


}