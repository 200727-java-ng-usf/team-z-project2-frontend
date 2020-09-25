
// !! currently just a copy of login

//import related stuff
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; //either add register logic to auth or put it in user

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    console.log('RegisterComponent instantiating...');
    console.log('RegisterComponent instantiation complete.');
  }

  ngOnInit(): void {

    console.log('Initializing form values for RegisterComponent...');
    //include role if added to the form
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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

    //will add a diff authService method for registration, gotta see what the servlets take in for registration
    this.authService.authenticate(this.formFields.username.value, this.formFields.password.value)
                    .subscribe(
                      // user successfully logged in, execute the function below
                      () => {
                        this.loading = false;
                        console.log('Registration successful!');
                        console.log('Navigating to dashboard...');
                        //include logic to point elsewhere based on user info
                          //admins should point to admin dashboard
                          //users should unlock... something idk yet

                        this.router.navigate(['/dashboard']); //point this wherever
                        
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
