import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  items = new Array;
  targetItem = new Item;
  rowData: any;
  newItem = new Item();
  public isFound:boolean
  public isItemExist:boolean;
 
 


  constructor(public storage:StorageService,private itemService:ItemService) { }

  ngOnInit(): void {

    this.showAllItems();
    
    var searchList = this.storage.get('searchList');
    if(searchList!= null){
        this.historyList = searchList;
    }
  }
 
    public keyword:string

    

    public historyList:any[] =[];
  
    doSearch(){

      this.isItemExist = false;
  
      if(this.historyList.indexOf(this.keyword)== -1){    // if != -1 there is duplicate value in the array
  
        this.historyList.push(this.keyword);  // push data into historyList
  
        this.storage.set('searchList',this.historyList);

        console.log(this.keyword);
        for(let i=0;i<this.items.length;i++){

       
          console.log(this.keyword);
  
          if(this.items[i].name.toUpperCase()==this.keyword.toUpperCase()){
            this.isItemExist = true;
            this.newItem=this.items[i];
        
          }
  
         }



       this.keyword = '';


  
        

      }
    
    }
  
    deleteHistory(key){

      this.isItemExist=false;
    
      this.historyList.splice(key,1);   // delete 1 item from position key
  
      this.storage.set('searchList',this.historyList);
    }



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

}