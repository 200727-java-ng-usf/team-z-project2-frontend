import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream

@NgModule({
  declarations: [
    AppComponent
=======
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
    //frontPage
    HotProductComponent,
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
