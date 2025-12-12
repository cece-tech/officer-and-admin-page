import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-digits',
  templateUrl: './digits.html',
  styleUrls: ['../profile/profile.css'],  // <-- reusing existing theme!
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class DigitsPage {

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  goTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

}
