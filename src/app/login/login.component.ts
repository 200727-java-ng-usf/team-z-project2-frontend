//import related stuff
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

//self identification, loaders
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//stuff to export
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    console.log('LoginComponent instantiating...');
    console.log('LoginComponent instantiation complete.');
  }

  ngOnInit(): void {

    console.log('Initializing form values for LoginComponent...');
    //include role if added to the form
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    console.log('LoginComponent form value initialization complete.');
  }

  get formFields() {
    return this.loginForm.controls;
  }  

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.authService.authenticate(this.formFields.username.value, this.formFields.password.value)
                    .subscribe(
                      // user successfully logged in, execute the function below
                      () => {
                        this.loading = false;
                        console.log('login successful!');
                        console.log('Navigating to dashboard...');
                        this.router.navigate(['/dashboard']); //point this wherever
                        //we can include logic at this part to direct based on role
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

  }//end auth logic

} //end export
