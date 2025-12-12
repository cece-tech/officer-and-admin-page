import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,                 
  selector: 'app-adviser',
  templateUrl: './adviser.html',
  styleUrls: ['../profile/profile.css'],
  imports: [CommonModule, RouterModule]
})
export class AdviserPage {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  goTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
