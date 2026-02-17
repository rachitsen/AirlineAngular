import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  router = new Router();

  user = signal<any>(JSON.parse(localStorage.getItem('user') || '{}'));

  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
