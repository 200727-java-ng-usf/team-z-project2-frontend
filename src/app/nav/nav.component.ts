import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from '../models/principal';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnDestroy {

  currentUser: Principal = null;
  currentUserSub: Subscription = null;
  loggedin: boolean = false;
  isUser: boolean = false;
  isManager: boolean = false;
  isAdmin: boolean = false;
 
  constructor(private authService: AuthService, private router: Router) {
    this.currentUserSub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      //this is all within the subscription, so should be updated anytime user info is updated
      if(user){
        console.log("Current user role: "+ this.currentUser.role);
        this.loggedin=true;
        console.log("Logged in: "+this.loggedin);
        
        //include logic for navbar links within this parent if statement
          //otherwise typescript will cry, cry, cry about null pointers like a baby
            //thank you typescript
        if(this.currentUser.role=="User"){
          this.isUser=true;
          console.log("Is User: "+this.isUser);
        } 
        if(this.currentUser.role=="Admin"){
          this.isAdmin=true;
          console.log("Is Admin: "+this.isAdmin);
        } 
        if(this.currentUser.role=="Manager"){
          this.isManager=true;
          console.log("Is Manager: "+this.isManager);
        } 
      } 

    });
  }

  

  //new; may change later
  defaultLinks = [
    {
      linkName: 'Login',
      fragment: '/login'
    },
    {
      linkName: 'Register',
      fragment: '/register'
    },
    {
      linkName: 'Users', //for testing atm
      fragment: '/users'
    },
    {
      linkName: 'Items', //for testing atm
      fragment: '/items'
    },
    {
      linkName: 'Orders', // for testing atm
      fragment: '/orders'
    },
    {
      linkName: 'OrderedItems', // for testing atm
      fragment: '/ordereditems'
    },
    {
      linkName: 'Test 404',
      fragment: '/404' //because this is not an actual link, it should still resolve to 404 page
    }
  ];

  userRoleLinks = [
    {
      linkName: 'Home', //back to storefront
      fragment: ''
    },
    {
      linkName: 'User Dashboard', //for testing atm
      fragment: '/userdashboard'
    },
    {
      linkName: 'Cart',
      fragment: '/cart' //shopping cart, until something better comes up
    }
  ];


  ngOnDestroy() {
    // remember to unsubscribe from observables to prevent memory leaks
    this.currentUserSub.unsubscribe(); //only cowards fear memory leaks
  }

  logout() {
    this.loggedin = !this.authService.logout();
    if(!this.loggedin){
      this.isUser=false;
      this.isManager=false;
      this.isAdmin=false;
    }
    this.router.navigate(['']); //point this back home. OLD: '/login'
  }

}