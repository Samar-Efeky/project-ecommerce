import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenWidthService {
  currentWidth = new BehaviorSubject<number>(0); 

  constructor() {
    if (this.isBrowser()) {
      this.saveCurrentWidth();
      window.addEventListener('resize', () => {
        this.saveCurrentWidth();
      });
    }
  }

  saveCurrentWidth() {
    if (this.isBrowser()) {
      const screenWidth = window.innerWidth;
      this.currentWidth.next(screenWidth); 
      console.log('Updated screen width:', screenWidth);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
