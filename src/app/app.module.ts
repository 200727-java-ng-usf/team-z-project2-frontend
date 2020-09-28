import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
  //notes on bootstrap:
    //will need to be installed after the other node_modules
    //npm install @ng-bootstrap/ng-bootstrap
      //OR
        //npm install bootstrap
    //if bootstrap still isn't working, 
      //npm install jquery
    //for debug issues, check the STYLE and SCRIPT arrays in the angular.json file
      //there could be file path issues depending on where the node_modules folder was placed
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
// import { ModelsComponent } from './models/models.component';
// import { OrderComponent } from './services/order/order.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ItemsComponent } from './items/items.component';
// import { ItemsDashboardComponent } from './items-dashboard/items-dashboard.component'; // made this at first but don't need it I think
import { OrdersComponent } from './orders/orders.component';
import { OrderedItemsComponent } from './ordered-items/ordered-items.component';
import { HotProductComponent } from './hot-product/hot-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    // ModelsComponent,
    // OrderComponent,
    LoginComponent,
    NotFoundComponent,
    StorefrontComponent,
    RegisterComponent,
    UsersComponent,
    UserDashboardComponent,
    ItemsComponent,
    // ItemsDashboardComponent,
    OrdersComponent,
    OrderedItemsComponent,
    HotProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
