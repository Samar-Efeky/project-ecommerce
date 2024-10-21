import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { SliderComponent } from "../slider/slider.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, SliderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  id: number = 0;
  productDetails: any;
  category: string | undefined; 
  productsCategory: any[] = [];

  constructor(private _activatedRoute: ActivatedRoute, private _productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadInitialProductDetails();
    
  }
  loadInitialProductDetails() {
    const productId = this._activatedRoute.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(+productId);
    }
  }

  loadProductDetails(productId: number) {
    this._productsService.getProductById(productId).subscribe(
      (data) => {
        this.productDetails = data;
        console.log('Product details loaded:', this.productDetails);
        this._productsService.getCategoryByProductId(productId).subscribe(
          (category) => {
            this.category = category; 
            console.log('Category loaded:', this.category);
            if (this.category) {
              this._productsService.getAllProducts(this.category).subscribe((products) => {
                this.productsCategory = products;
              });
            }
          }
        );
      }
    );
  }
  onProductSelected(productId: number) {
    this.loadProductDetails(productId); 
  }
}