import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { auth } from '../firebase-config'; 
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser=new BehaviorSubject(null);
  saveCurrentUser(){
    let token:any=localStorage.getItem("authToken");
    this.currentUser.next(jwtDecode(token));
  }
  constructor(private _httpClient:HttpClient,private _router:Router) {
    if (typeof window !== 'undefined' && localStorage.getItem("authToken") != null) {
      this.saveCurrentUser();
    }
   }
  signup(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      return userCredential.user.getIdToken().then(token => {
        localStorage.setItem('authToken', token);
        return token;
      });
    }));
  }
  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('authToken');
    this._router.navigate(['/signin']);
  }
  
}
