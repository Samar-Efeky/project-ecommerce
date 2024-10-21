import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenWidthService {
  currentWidth = new BehaviorSubject<number>(0); // البدء بقيمة افتراضية

  constructor() {
    if (this.isBrowser()) {
      // حفظ العرض الحالي عند بدء الخدمة
      this.saveCurrentWidth();

      // إضافة مستمع لتغيرات حجم الشاشة
      window.addEventListener('resize', () => {
        this.saveCurrentWidth();
      });
    }
  }

  saveCurrentWidth() {
    if (this.isBrowser()) {
      const screenWidth = window.innerWidth;
      this.currentWidth.next(screenWidth); // تحديث currentWidth بالقيمة الجديدة
      console.log('Updated screen width:', screenWidth); // سجل لتأكيد تحديث القيمة
    }
  }

  // التحقق مما إذا كان الكود يتم تشغيله في المتصفح
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
