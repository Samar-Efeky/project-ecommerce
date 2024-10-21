import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PricePipe } from '../pipes/price.pipe';
import { TitlePipe } from '../pipes/title.pipe';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CarouselModule,CommonModule,CurrencyPipe,PricePipe,TitlePipe,RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnChanges{
  @Input() products:any[]=[];
  productsOffers:any[]=[];
  private subscription: Subscription = new Subscription();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 15,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      800: {
        items: 3
      },
      1100: {
        items: 4
      }
    },
    nav: true
  }
  ngOnChanges() {
    this.productsOffers=this.products;
    console.log(this.productsOffers);
    
  }
 
}
