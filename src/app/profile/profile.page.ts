import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class ProfilePage implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.highlightActive();
  }

  downloadClearanceForm() {
    alert('Clearance Form Downloaded!');
  }

  highlightActive() {
  const currentUrl = this.router.url.replace('/', '').toLowerCase(); // e.g., 'adviser', 'profile'
  const sidebarItems = document.querySelectorAll('.menu-list li');

  sidebarItems.forEach(li => {
    const text = li.textContent?.trim().toLowerCase().replace(' ', '-'); // match URL format
    if (currentUrl.includes(text)) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
}

  logout() {
  this.router.navigate(['/login']);
}

goTo(path: string) {
  this.router.navigate([`/${path}`]);
}
}
