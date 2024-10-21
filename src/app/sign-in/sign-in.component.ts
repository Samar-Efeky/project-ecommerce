import { CommonModule } from '@angular/common';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { log } from 'node:console';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnDestroy{
  loginForm: FormGroup;
  showPassword: boolean = false;
  private subscription: Subscription = new Subscription();
  loginError: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService,private _Router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.subscription.add(
        this.authService.login(email, password).subscribe({
          next: (userCredential) => {
            this._Router.navigate(['/home']);
            this.authService.saveCurrentUser();
            
            
          },
          error: (error) => {
            this.loginError = 'email address is not registered or the password is incorrect'
            console.log(this.loginError);
          }
        })
      );
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); // تأكد من إلغاء الاشتراك عند تدمير المكون
  }
}