import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-home',
  standalone: true,  
    imports: [                    
    CommonModule,              
    RouterModule               
  ],             
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  environment = environment;
  constructor(private router: Router) {}

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
