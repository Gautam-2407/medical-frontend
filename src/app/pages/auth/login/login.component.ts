import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  login(event: Event): void {
    event.preventDefault();
    const email: string = this.email;
    const bodydata = { "email": email };
    console.log('Login Request:', bodydata);

    const url = environment.apiUrl;
    console.log('API URL:', url);

    this.loading = true;

    this.http.post(`${url}/patient/login`, bodydata, { responseType: 'text', observe: 'response' })
      .subscribe(
        (response) => {
          const contentType = response.headers.get('Content-Type');

          if (contentType && contentType.includes('application/json')) {
            const jsonData = response.body ? JSON.parse(response.body) : null;
            console.log('JSON Response:', jsonData);

            if (email === jsonData.prepatient.email) {
              this.router.navigateByUrl('/dashboard');
              localStorage.setItem("auth_token", jsonData.token )
            } else {
              alert('Incorrect Password');
              console.log('Login Error');
            }
          } else {
            console.log('Plain Text Response:', response.body);
            alert(response.body); 
          }
        },
        (error) => {
          console.error('Error during login:', error);
        }
      )
      .add(() => {
        
        this.loading = false;
      });
  }
}
