import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  standalone: true,
   imports: [                    
    CommonModule,              
    RouterModule               
  ],       
   templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  environment = environment;

}
