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

  currentUser: Principal;
  currentUserSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUserSub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  
  // authenticatedUserLinks = [
  //   {
  //     linkName: 'Structural Directives Demo',
  //     fragment: '/structural'
  //   }, 
  //   {
  //     linkName: 'Attribute Directives Demo',
  //     fragment: '/attribute'
  //   }, 
  //   {
  //     linkName: 'Pipes Demo',
  //     fragment: '/pipes'
  //   }, 
  //   {
  //     linkName: 'Quiz (HttpClient Demo)',
  //     fragment: '/quiz'
  //   },
  //   {
  //     linkName: 'Dashboard',
  //     fragment: '/dashboard'
  //   }
  // ]

  // unauthenticatedUserLinks = [
  //   {
  //     linkName: 'Login',
  //     fragment: '/login'
  //   }
  // ];

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
      linkName: 'Test 404',
      fragment: '/404' //because this is not an actual link, it should still resolve to 404 page
    }
  ];

  ngOnDestroy() {
    // remember to unsubscribe from observables to prevent memory leaks
    this.currentUserSub.unsubscribe(); //only cowards fear memory leaks
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']); //point this back home. OLD: '/login'
  }

}

//default demo html:
// <!-- this is where we can have role logic -->
// <!-- authenticated users -->
// <div *ngIf="currentUser">
//     <a class="dropdown-item" *ngFor="let link of authenticatedUserLinks" [routerLink]="link.fragment">
//         {{ link.linkName }}
//     </a>
//     <a class="dropdown-item" (click)="logout()">Logout</a> 
// </div>
// <!-- non-authenticated -->
// <div *ngIf="!currentUser">
//     <a class="dropdown-item" *ngFor="let link of unauthenticatedUserLinks" [routerLink]="link.fragment">
//         {{ link.linkName }}
//     </a>
// </div>
