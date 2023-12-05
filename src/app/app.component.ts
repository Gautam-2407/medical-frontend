import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Hospital';
  token: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize token property with the value from localStorage
    this.token = localStorage.getItem("auth_token");

    // Check the token and navigate accordingly
    if (this.token) {
      // Token exists, navigate to dashboard
      this.router.navigateByUrl('/dashboard');
    } else {
      // No token, navigate to login
      this.router.navigateByUrl('/login');
    }
  }
}
