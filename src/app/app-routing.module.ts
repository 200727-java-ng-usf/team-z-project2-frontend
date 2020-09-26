import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component'; //404 endpoint
import { StorefrontComponent } from './storefront/storefront.component'; //front page

const routes: Routes = [
  { path: '', component: StorefrontComponent}, //the landing page, currently set to storefront
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'storefront', component: StorefrontComponent },
  { path: 'users', component: UsersComponent }, //may need to be renamed if the url conflicts with http methods
  //
  { path: '**', component: NotFoundComponent } // wildcard routes should ALWAYS go last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }















// //below is for review (from demo):
// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { AttributeDirectivesComponent } from './attribute-directives/attribute-directives.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { FirstComponent } from './first/first.component';
// import { LoginComponent } from './login/login.component';
// import { NotFoundComponent } from './not-found/not-found.component';
// import { PipesComponent } from './pipes/pipes.component';
// import { QuizComponent } from './quiz/quiz.component';
// import { AuthGuardService } from './services/auth-guard.service';
// import { StructuralDirectivesComponent } from './structural-directives/structural-directives.component';

// const routes: Routes = [
//   { path: '', component: LoginComponent }, //FirstComponent
//   { path: 'login', component: LoginComponent },
//   { path: 'structural', component: StructuralDirectivesComponent, canActivate: [AuthGuardService]  },
//   { path: 'attribute', component: AttributeDirectivesComponent, canActivate: [AuthGuardService]  },
//   { path: 'pipes', component: PipesComponent, canActivate: [AuthGuardService]  },
//   { path: 'quiz', component: QuizComponent, canActivate: [AuthGuardService] },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
//   { path: '**', component: NotFoundComponent } // wildcard routes should ALWAYS go last
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }