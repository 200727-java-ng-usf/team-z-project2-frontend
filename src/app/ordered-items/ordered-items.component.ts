import { Component, OnInit } from '@angular/core';
import { OrderedItemService } from '../services/ordered-item.service';
import { OrderedItem } from '../models/ordereditem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ordered-items',
  templateUrl: './ordered-items.component.html',
  styleUrls: ['./ordered-items.component.css']
})
export class OrderedItemsComponent implements OnInit {
  orderedItems = new Array;
  show = false; //for the display div
  orderedItemFindForm: FormGroup;
  targetOrderedItem = new OrderedItem;
  tgtOrderedItem = new Array;
  
  constructor(private orderedItemService:OrderedItemService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    
    this.orderedItemFindForm = this.formBuilder.group({
      id: ['', Validators.required]
    });
  }
  get formFields() {
    return this.orderedItemFindForm.controls;
  }  
  
  showAllOrderedItems(): void{
    //apparently we don't need to parse it.
      //if we try to parse it (again), we will have committed a cardinal sin
        //my punishment was 3 hours of my life gone forever. 
          //thank you typescript
    

    this.orderedItemService.getAllOrderedItems().subscribe( //get the stuff
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
              let newOrderedItem = new OrderedItem();
              newOrderedItem.$id = respJSON[i].id; //FIX THIS depending on what backend sends back
              newOrderedItem.$order = respJSON[i].order;
              newOrderedItem.$item = respJSON[i].item;
              this.orderedItems.unshift(newOrderedItem); //adding orderedItem to array
              console.log('Added orderedItem with id of: '+ respJSON[i]["id"]);
            }
            console.log("Total orderedItems added: "+this.orderedItems.length);
          }
          
      },
      err=>{
          console.log(err.status);
      }
  );
    //then show the div
    this.revealOrderedItems();
    // return orderedItemArray;
  }

  showOrderedItem(){
    let id = this.formFields.id.value;
    this.orderedItemService.getTargetOrderedItem(id).subscribe( //get the stuff
      resp=>{ //take the response (should be a json)
          
          this.tgtOrderedItem.unshift(resp.body);
          
          console.log('0.id: '+ this.tgtOrderedItem[0].id); //man this is so gross
          console.log('Response:'+resp.status);
          if(resp.status == 200){ 
            let targetOrderedItem = new OrderedItem();
            targetOrderedItem.$id = this.tgtOrderedItem[0].id; //FIX THIS depending on what backend sends back
            targetOrderedItem.$order = this.tgtOrderedItem[0].order;
            targetOrderedItem.$item = this.tgtOrderedItem[0].item;
            console.log('Added orderedItem with id of: '+ this.tgtOrderedItem[0]["id"]);
          }
      },
      err=>{
          console.log(err.status);
      }
  );
    this.revealOrderedItems();
  }

  revealOrderedItems(){ //show toggler
    if(this.show==false){
      this.show=true;
    } 
  }

}