import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { imageAnimation, slideInAnimation } from '../animations/animation';
import { HeaderService } from '../services/header.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe],
templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations:[slideInAnimation,imageAnimation]
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(private ngZone: NgZone, private el: ElementRef, private _headerService: HeaderService) {}

  homeImages: any[] = [];
  imgSrc: string = '';
  imgTitle: string = '';
  index: number = 0;
  state: string = 'visible';
  intervalId: any;

  ngOnInit(): void {
    this._headerService.getHeaderImages().subscribe(
      (data) => {
        if (data && data.images && data.images.length > 0) {
          this.homeImages = data.images;
          this.imgSrc = this.homeImages[0].imageUrl;
          this.imgTitle = this.homeImages[0].title;
          this.startImageRotation();
        } else {
          console.error('No images found or data is undefined');
        }
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  startImageRotation() {
    if (this.homeImages.length > 0) {
      this.ngZone.runOutsideAngular(() => {
        this.intervalId = setInterval(() => {
          this.ngZone.run(() => {
            this.state = 'hidden';
            setTimeout(() => {
              if (this.homeImages.length > 0) {
                this.index = (this.index + 1) % this.homeImages.length;
                this.imgSrc = this.homeImages[this.index].imageUrl;
                this.imgTitle = this.homeImages[this.index].title;
                this.state = 'visible';
              }
            }, 600);
          });
        }, 5000);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
