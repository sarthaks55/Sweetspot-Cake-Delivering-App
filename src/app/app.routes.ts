import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { CakePageComponent } from './Components/cakepage/cakepage.component';
import { CartPageComponent } from './Components/cartpage/cartpage.component';
import { CheckoutpageComponent } from './Components/checkoutpage/checkoutpage.component';

import { RegisterComponent } from './Components/register/register.component';
import { PaymentpageComponent } from './Components/paymentpage/paymentpage.component';
import { TrackpageComponent } from './Components/trackpage/trackpage.component';


export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'home', component:HomeComponent},
    {path:'cake/:id', component:CakePageComponent},
    {path:'cart-page', component: CartPageComponent},
    {path:'checkout', component:CheckoutpageComponent},
    {path:'payment', component:PaymentpageComponent},
    {path:'track', component:TrackpageComponent},

];
