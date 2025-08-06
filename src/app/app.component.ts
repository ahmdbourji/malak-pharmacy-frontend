import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  environment = environment;

  // متغير القائمة
  menuOpen = false;

  // دالة فتح/إغلاق القائمة
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // دالة إغلاق القائمة عند اختيار رابط
  closeMenu() {
    this.menuOpen = false;
  }
}

