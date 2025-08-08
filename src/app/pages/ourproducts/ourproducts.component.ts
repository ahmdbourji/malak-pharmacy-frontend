import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-ourproducts',
  templateUrl: './ourproducts.component.html',
  styleUrls: ['./ourproducts.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class OurproductsComponent implements OnInit {
  products: any[] = [];
  searchTerm = '';
  categories: string[] = [];
  selectedCategory: string | null = null;

  environment = environment; // exposes base URL to template
  private productService = inject(ProductService);

  /* modal */
  selectedProduct: any = null;

  /* ---------- life-cycle ---------- */
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.categories = [
        ...new Set(this.products.map((p) => p.category).filter(Boolean)),
      ];
    });
  }

  /* ---------- category filter ---------- */
  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  clearCategoryFilter(): void {
    this.selectedCategory = null;
  }

  // fired by <select>
  onSelectCategory(event: Event): void {
    const selectEl = event.target as HTMLSelectElement; // safe cast
    const value = selectEl?.value ?? '';
    value ? this.filterByCategory(value) : this.clearCategoryFilter();
  }

  /* ---------- search + filter pipeline ---------- */
  filteredProducts(): any[] {
    let filtered = this.products;

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.category && p.category.toLowerCase().includes(term))
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter((p) => p.category === this.selectedCategory);
    }

    return filtered;
  }

  /* ---------- modal ---------- */
  openDescription(product: any): void {
    this.selectedProduct = product;
  }

  closeDescription(): void {
    this.selectedProduct = null;
  }
}
