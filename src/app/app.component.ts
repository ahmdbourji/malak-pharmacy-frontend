//import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
//@Component({
  //selector: 'app-root',
  //standalone: true,
  //imports: [RouterOutlet],
  //templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
//})
//export class AppComponent {
//  title = 'frontend';
//}
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
@Component({
  standalone: true,
  selector: 'app-root',
 imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  environment = environment;
}

