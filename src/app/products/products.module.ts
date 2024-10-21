import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

// Routing Module
import { ProductsRoutingModule } from './products-routing.module';
import { DayOfferPipe } from '../pipes/day-offer.pipe';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule, 
    ProductsRoutingModule ,
   DayOfferPipe, CurrencyPipe
  ]
})
export class ProductsModule { }