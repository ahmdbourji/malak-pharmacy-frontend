import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';

type SortKey = 'newest' | 'priceAsc' | 'priceDesc' | 'nameAsc';

@Component({
  standalone: true,
  selector: 'app-ourproducts',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ourproducts.component.html',
  styleUrls: ['./ourproducts.component.css']
})
export class OurproductsComponent implements OnInit {
  products: any[] = [];
  loading = true;
  skeletons = Array.from({ length: 8 });
  searchTerm = '';
  categories: string[] = [];
  selectedCategory: string | null = null;
  sortBy: SortKey = 'newest';
  environment = environment;

  private productService = inject(ProductService);
  selectedProduct: any = null;

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.categories = [...new Set(this.products.map(p => p.category).filter(Boolean))];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  filterByCategory(category: string) { this.selectedCategory = category; }
  clearCategoryFilter() { this.selectedCategory = null; }
  onCategorySelect(value: string) { this.selectedCategory = value || null; }

  clearAll() {
    this.searchTerm = '';
    this.selectedCategory = null;
    this.sortBy = 'newest';
  }

  filteredProducts() {
    let out = this.products.slice();

    if (this.searchTerm.trim()) {
      const q = this.searchTerm.toLowerCase();
      out = out.filter(p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    }
    if (this.selectedCategory) {
      out = out.filter(p => p.category === this.selectedCategory);
    }

    switch (this.sortBy) {
      case 'priceAsc':  out.sort((a,b) => (+a.price || 0) - (+b.price || 0)); break;
      case 'priceDesc': out.sort((a,b) => (+b.price || 0) - (+a.price || 0)); break;
      case 'nameAsc':   out.sort((a,b) => (a.name||'').localeCompare(b.name||'')); break;
      default:          out.sort((a,b) => (b.id||0) - (a.id||0)); // newest by id
    }

    return out;
  }

  trackById = (_: number, p: any) => p.id ?? p.name;

  openDescription(product: any) { this.selectedProduct = product; }
  closeDescription() { this.selectedProduct = null; }
}




