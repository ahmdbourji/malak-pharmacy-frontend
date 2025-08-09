import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-ourproducts',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ourproducts.component.html',
  styleUrls: ['./ourproducts.component.css']
})
export class OurproductsComponent implements OnInit {
  products: any[] = [];
  searchTerm = '';
  categories: string[] = [];
  selectedCategory: string | null = null;
  environment = environment;

  private productService = inject(ProductService);

  // Modal
  selectedProduct: any = null;

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.categories = [...new Set(this.products.map(p => p.category).filter(Boolean))];
    });
  }

  filterByCategory(category: string) { this.selectedCategory = category; }
  clearCategoryFilter() { this.selectedCategory = null; }

  // للـ <select> على الموبايل
  onCategorySelect(value: string) { this.selectedCategory = value || null; }

  filteredProducts() {
    let filtered = this.products;

    if (this.searchTerm.trim()) {
      const q = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    return filtered;
  }

  openDescription(product: any) { this.selectedProduct = product; }
  closeDescription() { this.selectedProduct = null; }
}



