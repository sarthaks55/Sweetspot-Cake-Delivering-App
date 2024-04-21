import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { CakePageComponent } from './Components/cakepage/cakepage.component';
import { CartPageComponent } from './Components/cartpage/cartpage.component';
import { CheckoutpageComponent } from './Components/checkoutpage/checkoutpage.component';


export const routes: Routes = [
    {path:'',redirectTo : 'login',pathMatch:'full'},
    {path:'', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent},
    {path:'cake/:id', component:CakePageComponent},
    {path:'cart-page', component: CartPageComponent},
    {path:'checkout', component:CheckoutpageComponent},

];
