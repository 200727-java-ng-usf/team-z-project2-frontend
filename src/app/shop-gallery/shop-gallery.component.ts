import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-shop-gallery',
  templateUrl: './shop-gallery.component.html',
  styleUrls: ['./shop-gallery.component.css']
})
export class ShopGalleryComponent implements OnInit {

  items = new Array;

  constructor(private itemService: ItemService) { 

  }

  ngOnInit(): void {
    //build item array
    this.buildItemArray();
  }

  test(id){
    alert(id);
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
