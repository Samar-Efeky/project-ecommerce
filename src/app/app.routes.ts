import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { GiftCardsComponent } from './gift-cards/gift-cards.component';
import { ContactComponent } from './contact/contact.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth.guard';
import { ShoppingComponent } from './shopping/shopping.component';
export const routes: Routes = [
    
    {path:"" , redirectTo:"home", pathMatch:"full"},
    {path:"home" , component:HomeComponent},
    {path:"about" , component:AboutComponent},
    {path:"bestsellers" , component:BestSellersComponent},
    {path:"brands" , component:BrandsComponent},
    {path:"cart" ,canActivate:[authGuard] ,component:CartComponent},
    {path:"giftcards" , component:GiftCardsComponent},
    {path:"contact" , component:ContactComponent},
    {path:"signin" , component:SignInComponent},
    {path:"signup" , component:SignUpComponent},
    {path:"profile" , component:ProfileComponent},
    {path:"shopping", component:ShoppingComponent},
];

