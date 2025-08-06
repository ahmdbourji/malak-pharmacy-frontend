import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  product: any = {};
  isEditing = false;
  selectedFile: File | null = null;
environment = environment;
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log('📦 Products loaded:', this.products);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('📁 Selected file:', this.selectedFile?.name);
  }

  submitProduct() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('category', this.product.category);
    formData.append('price', this.product.price);
    formData.append('description', this.product.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditing && this.product.id) {
      console.log('🔄 Updating product with ID:', this.product.id);
      this.productService.updateProduct(this.product.id, formData).subscribe({
        next: () => {
          this.resetForm();
          this.loadProducts();
        },
        error: err => console.error('❌ Update failed:', err)
      });
    } else {
      console.log('➕ Creating new product');
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.resetForm();
          this.loadProducts();
        },
        error: err => console.error('❌ Creation failed:', err)
      });
    }
  }

  editProduct(p: any) {
    this.product = { ...p };
    this.isEditing = true;
    this.selectedFile = null; // clear file so existing image is not overwritten unintentionally
    console.log('✏️ Editing product:', this.product);
  }

  deleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('🗑️ Product deleted:', id);
        this.loadProducts();
      },
      error: err => console.error('❌ Delete failed:', err)
    });
  }

  resetForm() {
    this.product = {};
    this.isEditing = false;
    this.selectedFile = null;
    console.log('🧹 Form reset');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/loginhadeel-971999']);
  }
}
