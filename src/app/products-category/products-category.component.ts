import { CommonModule, CurrencyPipe} from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitlePipe } from '../pipes/title.pipe';
import { ProductsService } from '../services/products.service';
import { PricePipe } from '../pipes/price.pipe';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [CommonModule,FormsModule,TitlePipe,CurrencyPipe,PricePipe,RouterLink],
templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.scss'
})
export class ProductsCategoryComponent implements OnInit ,OnDestroy{
  products: any[] = [];
  originalProducts: any[] = []; 
  categoriesList: string[] = [];
  paginatedItems: any[] = [];
  itemsPerPage = 12;
  currentPage = 1;
  totalPages = 0;
  selectedFilterText: string = '';
  textFilter:boolean=false;
  private subscriptions: Subscription[] = [];
  constructor(private _productsService: ProductsService) {}
  index:number=0;
  ngOnInit() {
    this.categoriesList = this._productsService.categories;
    for (let category of this.categoriesList) {
      let  subscription =this._productsService.getAllProducts(category).subscribe(() => {
        this.products = this._productsService.products; 
        this.originalProducts = [...this.products]; 

        this.allProducts();
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updatePaginatedItems();
      });
      this.subscriptions.push(subscription); 
    }
  }

  allProducts() {
    this.products.sort(() => Math.random() - 0.5);
    this.originalProducts.sort(() => Math.random() - 0.5);

  }
  filterProductsByRating(value:number,filterText:string){
    this.selectedFilterText=filterText;
    this.products=this.originalProducts.filter((product)=>{
        return product.rating>=value;
    });
    this.currentPage = 1; 
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.updatePaginatedItems();
    this.filterActive();
  }
  filterProductsByPrice(minPrice: number, maxPrice: number, filterText: string) {
    this.selectedFilterText = filterText;
    this.products = this.originalProducts.filter(product => 
      product.randomPrice >= minPrice && product.randomPrice <= maxPrice
    );
    this.currentPage = 1; 
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.updatePaginatedItems();
    this.filterActive();
  }
  deleteFilter() {
    this.products = [...this.originalProducts]; 
    this.currentPage = 1; 
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.updatePaginatedItems();
    this.textFilter=false;
  }
filterActive(){
  this.textFilter=true;

}
  // pagination //////////////////////////////////////////////////////////
  updatePaginatedItems() {
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;

    this.paginatedItems = this.products.slice(startIndex, endIndex);
  }

  totalPagesArray() {
    return new Array(this.totalPages);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedItems();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getPages(): number[] {
    let pagesToShow = 3;
    let pages: number[] = [];
    for (let i = this.currentPage - pagesToShow; i <= this.currentPage + pagesToShow; i++) {
      if (i >= 1 && i <= this.totalPages) {
        pages.push(i);
      }
    }
    return pages;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
}
