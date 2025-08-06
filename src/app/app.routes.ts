import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OurproductsComponent } from './pages/ourproducts/ourproducts.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard'; // ✅ Import AuthGuard

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'ourproducts', component: OurproductsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'loginhadeel-971999', component: LoginComponent },  // Login page
  {
    path: 'hadeeladmin-971999',
    component: AdminComponent,
    canActivate: [AuthGuard] // ✅ Protect admin page with AuthGuard
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
