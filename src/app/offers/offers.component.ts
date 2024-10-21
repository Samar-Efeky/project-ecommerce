import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DayOfferPipe } from '../pipes/day-offer.pipe';
import { SliderComponent } from "../slider/slider.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, DayOfferPipe, CurrencyPipe, SliderComponent],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent implements OnInit ,OnDestroy{
  products: any[] = [];
  categoriesList: string[] = [];
  randomProduct: any;
  productsLoaded = false;
  timeRemaining: string = ''; 
  timerInterval: any; 
  private STORAGE_KEY = 'randomProduct';
  private EXPIRY_KEY = 'randomProductExpiry';
  private subscription: Subscription= new Subscription();
  constructor(private _productsService: ProductsService) {}
  ngOnInit() {
    this.categoriesList = this._productsService.categories;
    let productsLoadedCount = 0;
    this.products=this._productsService.products;
    for (let category of this.categoriesList) {
      const productSubscription = this._productsService.getAllProducts(category)
      .subscribe(() => {
        productsLoadedCount++;
        if (productsLoadedCount === this.categoriesList.length) {
          if (typeof window !== 'undefined' && window.localStorage) {
            this.handleRandomProductStorage();
          }
        }
      });

    this.subscription.add(productSubscription); 
    }
  }
  handleRandomProductStorage() {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
  
    const currentTime = new Date().getTime();
    const storedExpiry = localStorage.getItem(this.EXPIRY_KEY);
  
    if (storedExpiry && currentTime < +storedExpiry) {
      this.randomProduct = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      this.startCountdown(+storedExpiry); 
    } else {
      this.selectRandomProduct();
      const newExpiryTime = currentTime + 86400000; 
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.randomProduct));
      localStorage.setItem(this.EXPIRY_KEY, newExpiryTime.toString());
  
      this.startCountdown(newExpiryTime);
    }
  }
  

  selectRandomProduct() {
    if (this.products.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.products.length);
      this.randomProduct = this.products[randomIndex];
    } 
  }
  getTomorrowDate(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
  calculateTimeRemaining(expiryTime: number) {
    const currentTime = new Date().getTime();
    const timeDiff = expiryTime - currentTime;
  
    if (timeDiff > 0) {
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
      this.timeRemaining = `${hours}h :${minutes}m :${seconds}s`;
      
    } else {
      this.timeRemaining = 'Expired';
      clearInterval(this.timerInterval); 
    }
  }
  startCountdown(expiryTime: number) {
    this.calculateTimeRemaining(expiryTime); 
  
  
    this.timerInterval = setInterval(() => {
      this.calculateTimeRemaining(expiryTime);
    }, 1000);
  }  
  ngOnDestroy() {
    this.subscription.unsubscribe();  // إلغاء الاشتراك عند التدمير
    if (this.timerInterval) {
      clearInterval(this.timerInterval);  // إيقاف الـ timer إذا كان نشطاً
    }
  }
}