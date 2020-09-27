import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items = new Array;
  show = false; //for the display div
  itemFindForm: FormGroup;
  targetItem = new Item;
  tgtItem = new Array;
  
  constructor(private itemService:ItemService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    
    this.itemFindForm = this.formBuilder.group({
      id: ['', Validators.required]
    });
  }
  get formFields() {
    return this.itemFindForm.controls;
  }  
  
  showAllItems(): void{
    //apparently we don't need to parse it.
      //if we try to parse it (again), we will have committed a cardinal sin
        //my punishment was 3 hours of my life gone forever. 
          //thank you typescript
    

    this.itemService.getAllItems().subscribe( //get the stuff
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
              let newItem = new Item();
              newItem.$item_id = respJSON[i].id; //FIX THIS depending on what backend sends back
              newItem.$name = respJSON[i].name;
              newItem.$price = respJSON[i].price;
              newItem.$stock = respJSON[i].stock;
              newItem.$description = respJSON[i].description;
              newItem.$itemImageUrl = respJSON[i].itemImageUrl;
              newItem.$genre_id = respJSON[i].genre_id;
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
    //then show the div
    this.revealItems();
    // return itemArray;
  }

  showItem(){
    let id = this.formFields.id.value;
    this.itemService.getTargetItem(id).subscribe( //get the stuff
      resp=>{ //take the response (should be a json)
          
          this.tgtItem.unshift(resp.body);
          
          console.log('0.id: '+ this.tgtItem[0].id); //man this is so gross
          console.log('Response:'+resp.status);
          if(resp.status == 200){ 
            let targetItem = new Item();
            targetItem.$item_id = this.tgtItem[0].id; //FIX THIS depending on what backend sends back
            targetItem.$name = this.tgtItem[0].firstname;
            targetItem.$price = this.tgtItem[0].lastname;
            targetItem.$stock = this.tgtItem[0].email;
            targetItem.$description = this.tgtItem[0].Itemname;
            targetItem.$itemImageUrl = this.tgtItem[0].password;
            targetItem.$genre_id = this.tgtItem[0].genre_id;
            console.log('Added item with id of: '+ this.tgtItem[0]["id"]);
          }
      },
      err=>{
          console.log(err.status);
      }
  );
    this.revealItems();
  }

  revealItems(){ //show toggler
    if(this.show==false){
      this.show=true;
    } 
  }

}
