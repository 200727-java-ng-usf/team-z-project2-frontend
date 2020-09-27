
//import related stuff
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service'; //either add register logic to auth or put it in user
import { UserService } from '../services/user.service';

//self identification, loaders
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
//stuff to export
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    console.log('RegisterComponent instantiating...');
    console.log('RegisterComponent instantiation complete.');
  }

  ngOnInit(): void {

    console.log('Initializing form values for RegisterComponent...');
    //include role if added to the form
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    console.log('RegisterComponent form value initialization complete.');
  }

  get formFields() {
    return this.registerForm.controls;
  }  

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) return;
    this.loading = true;

    let newUser = new User;
    newUser.$username = this.formFields.username.value;
    newUser.$password = this.formFields.password.value;
    newUser.$email = this.formFields.email.value;
    newUser.$firstName = this.formFields.firstName.value;
    newUser.$lastName = this.formFields.lastName.value;
    console.log("New user: "+ newUser);

    //will add a diff authService method for registration, gotta see what the servlets take in for registration
    this.userService.registerNewUser(newUser)
                    .subscribe(
                      // user successfully logged in, execute the function below
                      () => {
                        this.loading = false;
                        console.log('Registration successful!');
                        console.log('Navigating to dashboard...');
                        //include logic to point elsewhere based on user info
                          //admins should point to admin dashboard
                          //users should unlock... something idk yet

                        this.router.navigate(['']); //point this wherever
                        
                      },
                      // if an error occurs, execute the function below
                      err => {
                        console.log(err);
                        this.loading = false;
                        this.submitted = false;
                      },
                      () => {
                        console.log('observable complete!')
                      }
                    );

  }//end registration logic

} //end export
