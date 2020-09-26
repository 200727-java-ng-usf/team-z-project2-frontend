import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = new Array;
  show = false; //for the display div
  userFindForm: FormGroup;
  targetUser;
  
  constructor(private userService:UserService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.userFindForm = this.formBuilder.group({
      id: ['', Validators.required]
    });
  }
  get formFields() {
    return this.userFindForm.controls;
  }  
  
  showAllUsers(): void{
    //apparently we don't need to parse it.
      //if we try to parse it (again), we will have committed a cardinal sin
        //my punishment was 3 hours of my life gone forever. 
          //thank you typescript
    

    this.userService.getAllUsers().subscribe( //get the stuff
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
              let newUser = new User();
              newUser.$user_id = respJSON[i].id; //FIX THIS depending on what backend sends back
              newUser.$firstName = respJSON[i].firstname;
              newUser.$lastName = respJSON[i].lastname;
              newUser.$email = respJSON[i].email;
              newUser.$username = respJSON[i].username;
              newUser.$password = respJSON[i].password;
              // newUser.$role = user["role"];
              this.users.unshift(newUser); //adding user to array
              console.log('Added user with id of: '+ respJSON[i]["id"]);
            }
            console.log("Total users added: "+this.users.length);
          }
          
      },
      err=>{
          console.log(err.status);
      }
  );
    //then show the div
    this.revealUsers();
    // return userArray;
  }

  showUser(){
    let id = this.formFields.id.value;
    this.userService.getTargetUser(id).subscribe( //get the stuff
      resp=>{ //take the response (should be a json)
          console.log("resp.body: "+resp.body);
          let respJSON = resp.body;
          console.log("json: "+respJSON);
          console.log('0.id: '+ respJSON[0].id); //THIS ONE RIGHT HERE. THIS WORKS
          console.log('Response:'+resp.status);
          if(resp.status == 200){ //FIX THIS depending on returned code
            let targetUser = new User();
            targetUser.$user_id = respJSON[0].id; //FIX THIS depending on what backend sends back
            targetUser.$firstName = respJSON[0].firstname;
            targetUser.$lastName = respJSON[0].lastname;
            targetUser.$email = respJSON[0].email;
            targetUser.$username = respJSON[0].username;
            targetUser.$password = respJSON[0].password;
            console.log('Added user with id of: '+ respJSON[0]["id"]);
          }
      },
      err=>{
          console.log(err.status);
      }
  );
    this.revealUsers();
  }

  revealUsers(){ //show toggler
    if(this.show==false){
      this.show=true;
    } 
  }

}

















//
//can't get this to work
  // getUsers(): void {
  //   this.userService.getAllUsers()
  //   .subscribe(users => this.users = users);

  //   // console.log(this.users[0].username);
  // }