import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService{
  products:any[]=[];
  originalProducts:any[]=[]
  constructor(private _httpClient:HttpClient) { }
  categories:string[]=['Laptops','Digital camera','Tablets',
    'Smartwatches','Smart TVs','Headphones','3D Printers','Gaming Consoles','Monitors',
    'Speakers','Network Devices','Electronic components','Computers','Mobiles'
  ]
  getAllProducts(category: string): Observable<any[]> {
    return this._httpClient.get(`../assets/api-files/${category}-us-en-true-1-100-images--.json`).pipe(
      map((data: any) => {
        const productsData = data.images.slice(0, 40);
        const processedProducts = productsData.map((product: any, index: number) => ({
          ...product,
          randomPrice: this.getRandom(20, 20000),
          countRated: this.getRandom(1, 100),
          rating: this.getRandom(1, 5),
          randomOffer: this.getRandom(200, 600),
          id: this.products.length + index + 1,
          category: category
        }));
        this.products.push(...processedProducts);
        return processedProducts; 
      })
     
    );
  }
  getProductById(id: number): Observable<any> {
    if (this.products.length === 0) {
      return throwError('Products not loaded yet');
    }
    
    const product = this.products.find(product => product.id === id);
    if (product) {
      return of(product); 
    } else {
      return throwError('Product not found'); 
    }
  }
  getCategoryByProductId(id: number): Observable<string | undefined> {
    return this.getProductById(id).pipe(
      map((product: any) => product ? product.category : undefined)
    );
  }
  
  getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
}

