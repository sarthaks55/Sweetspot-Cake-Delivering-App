import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { CakePageComponent } from './Components/cakepage/cakepage.component';
import { CartPageComponent } from './Components/cartpage/cartpage.component';
import { CheckoutpageComponent } from './Components/checkoutpage/checkoutpage.component';
import { RegisterComponent } from './Components/register/register.component';
import { PastriesComponent } from './Components/StoreItems/pastries/pastries.component';
import { TrackpageComponent } from './Components/trackpage/trackpage.component';
import { AuthGuard } from './auth/auth.guard';
import { StoreLocationComponent } from './Components/store-location/store-location.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { InventoryManagementComponent } from './Components/inventory-management/inventory-management.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component';


export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'home', component:HomeComponent},
    {path:'cake/:id', component:CakePageComponent},
    { path: 'pastry-cakes', component: PastriesComponent },
    {path:'cart-page', component: CartPageComponent},
    {path:'checkout', component:CheckoutpageComponent,canActivate:[AuthGuard]},
    {path:'admin-dashboard', component:AdminDashboardComponent,canActivate:[AuthGuard],data: { admin: true }},
    {path:'analytics', component:AnalyticsComponent,canActivate:[AuthGuard],data: { admin: true }},
    {path:'store', component:StoreLocationComponent,canActivate:[AuthGuard],data: { admin: true }},
    {path:'inventory', component:InventoryManagementComponent,canActivate:[AuthGuard],data: { admin: true }},
    {path:'track', component:TrackpageComponent,canActivate:[AuthGuard]},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }