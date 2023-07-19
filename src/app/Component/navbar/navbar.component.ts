import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public service: AuthService,private router: Router) { }
  authStatus!: boolean;
  
  ngOnInit(): void {
    console.log(this.service.loggedIn)
    this.authStatus = this.service.loggedIn;
    console.log(this.service.username);

  }

 /* get getAuthStatus(): boolean {
    return this.service.loggedIn;
  }*/

  logout(): void {
    localStorage.removeItem("accessToken");
    this.service.loggedIn = false;
    this.router.navigateByUrl('/home')
    location.reload();
  }

}
