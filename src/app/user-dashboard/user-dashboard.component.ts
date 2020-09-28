import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Principal } from '../models/principal';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  currentUser: Principal;
  currentUserSub: Subscription;

  constructor(private authService: AuthService) { 
    this.currentUserSub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
  }

  // displayUserInfo(){
  //   this.currentUser.id;
  // }
  

}
