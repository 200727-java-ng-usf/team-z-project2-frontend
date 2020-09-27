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
  userUpdateForm: FormGroup;
  targetUser = new User;
  tgtUser = new Array;
  
  constructor(private userService:UserService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    
    this.userFindForm = this.formBuilder.group({
      id: ['', Validators.required]
    });

    this.userUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });

  }
  get formFields() {
    return this.userFindForm.controls;
  }  
  get updateFields() {
    return this.userUpdateForm.controls;
  }  

  updateUser(){
    let updatedUser = new User;
    updatedUser.$username = this.formFields.username.value;
    updatedUser.$password = this.formFields.password.value;
    updatedUser.$email = this.formFields.email.value;
    updatedUser.$firstName = this.formFields.firstName.value;
    updatedUser.$lastName = this.formFields.lastName.value;
    console.log("Updated user: "+ updatedUser);
    this.userService.updateTargetUser(updatedUser)
    .subscribe(
      () => {
        console.log('Update successful!');
      },
      // if an error occurs, execute the function below
      err => {
        console.log(err);
      },
      () => {
      }
    );
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
              newUser.$role = respJSON[i].role;
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
          
          this.tgtUser.unshift(resp.body);
          
          console.log('0.id: '+ this.tgtUser[0].id); //man this is so gross
          console.log('Response:'+resp.status);
          if(resp.status == 200){ 
            let targetUser = new User();
            targetUser.$user_id = this.tgtUser[0].id; //FIX THIS depending on what backend sends back
            targetUser.$firstName = this.tgtUser[0].firstname;
            targetUser.$lastName = this.tgtUser[0].lastname;
            targetUser.$email = this.tgtUser[0].email;
            targetUser.$username = this.tgtUser[0].username;
            targetUser.$password = this.tgtUser[0].password;
            console.log('Added user with id of: '+ this.tgtUser[0]["id"]);
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