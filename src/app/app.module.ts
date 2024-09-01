import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Importing as standalone
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.sevice';
import { provideHttpClient } from '@angular/common/http'; // New import
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppComponent// Import the standalone component
  ], // Provide AuthService here
  bootstrap: [AppComponent],

  providers: [
    provideHttpClient() ,AuthService],
})
export class AppModule { }
