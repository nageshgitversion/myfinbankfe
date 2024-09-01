import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.sevice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user.username; // Assuming user has a username property
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
