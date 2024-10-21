import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideBarComponent } from './../sidebar/sidebar.component';
import { slideDownAnimation} from '../animations/animation';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ScreenWidthService } from '../services/screen-width.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,SideBarComponent,FormsModule],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations:[slideDownAnimation]
})
export class NavbarComponent implements OnInit{
  sidebarState:string='out';
  isLogin:boolean=false;
  toggleSidebar() {
    this.sidebarState = this.sidebarState === 'out' ? 'in' : 'out';
  }
  onSidebarStateChange(newState: string) {
    this.sidebarState = newState;
  }
  categoriesList:string[]=[];
  constructor(private  _productsService:ProductsService,
    private _router:Router,
    private _authService:AuthService,
  private _screenWidthService:ScreenWidthService){
  }
  screenWidth:number=0
  screen:boolean=false;
  ngOnInit() {
    this.categoriesList=this._productsService.categories;
    this._authService.currentUser.subscribe(()=>{
      if(this._authService.currentUser.getValue()!=null){
        this.isLogin=true;
      }
      else{
        this.isLogin=false;
      }
    })
    this._screenWidthService.currentWidth.subscribe(
      (width) => {
        this.screenWidth = width;
        console.log(this.screenWidth)
      }
    ); 
  }
  productsCategory:any[]=[];
  getCategory(value:string){
    this._productsService.getAllProducts(value).subscribe((data)=>{
      this.productsCategory=data.slice(0,30);
      
    })
  }
  Active:boolean=false;
  isActive(){
    this.Active=!this.Active;
  }
  ActiveFalse(){
    this.Active=false;
  }
  getCompoent(){
    this._router.navigate(["/home"]);
    this.isActive();
  }
  searchVisable:boolean=false
  getSearch(){
      this.searchVisable=!this.searchVisable;
  }
}

