import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { slideDownAnimation } from '../animations/animation';
import { ProductsService } from '../services/products.service';
import { ProductsCategoryComponent } from "../products-category/products-category.component";
@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsCategoryComponent],
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  animations:[slideDownAnimation]
})
export class ShoppingComponent implements OnInit {
  categoriesList: string[] = [];
  products:any[]=[];
  @ViewChild(ProductsCategoryComponent) productsCategoryComponent!: ProductsCategoryComponent;
  filterByRating(rating:number,text:string){
    this.productsCategoryComponent.filterProductsByRating(rating,text);
  }
  filterProducts(x:number,y:number,z:string) {
    this.productsCategoryComponent.filterProductsByPrice(x,y,z);
  }
  constructor(private _productsService: ProductsService) {}
  ngOnInit() {
    this.categoriesList = this._productsService.categories;
    
  }
  active:boolean=false;
  isActive(){
    this.active=!this.active;
  }
 
}
