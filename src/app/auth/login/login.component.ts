import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.sevice'; 
// Importing as standalone
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http'; // New import
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]// New configuration for HttpClient
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  onSubmit() {

    const { username, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Redirect to user-dashboard upon successful login
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login error
        }
      });
    }
  }
}
