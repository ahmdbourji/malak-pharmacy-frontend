import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-contact',
  standalone: true,
   imports: [                    
    CommonModule,              
    RouterModule,
    FormsModule               
  ],       
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
    name = '';
  email = '';
  message = '';
  environment = environment;
  onSubmit() {
    alert(`Thanks, ${this.name}! Your message has been sent.`);
    // Here you can add your send logic (API call)
  }

}
