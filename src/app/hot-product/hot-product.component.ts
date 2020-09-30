import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import {StorageService} from '../services/storage.service'

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

  constructor(private itemService:ItemService,public storage:StorageService) { }

  ngOnInit() {

    var hotproduct = this.storage.get('hotproduct');
    this.isAddItem = false;

    if(hotproduct!= null){

     this.hotProduct = hotproduct;
    }
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

    
}

deleteData(key){

  this.hotProduct.splice(key,1);   // delete 1 item from position key

  this.storage.set('hotproduct',this.hotProduct);    // set new todolist in localstorage
  if(this.hotProduct == null){
    this.isAddItem = false;
  }

}



submitOrder(itemId:number){

  alert("your item id is"+itemId)


}


}