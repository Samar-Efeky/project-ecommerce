import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private STORAGE_KEY = 'randomProduct';
  private EXPIRY_KEY = 'randomProductExpiry';

  constructor() {}

  setRandomProduct(product: any) {
    let currentTime = new Date().getTime();
    let newExpiryTime = currentTime + 86400000; // 24 ساعة
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(product));
    localStorage.setItem(this.EXPIRY_KEY, newExpiryTime.toString());
  }

  getRandomProduct() {
    const storedExpiry = localStorage.getItem(this.EXPIRY_KEY);
    const currentTime = new Date().getTime();

    if (storedExpiry && currentTime < +storedExpiry) {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    }

    return null; // أو يمكنك إرجاع قيمة افتراضية
  }

  clearStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
  }
}
