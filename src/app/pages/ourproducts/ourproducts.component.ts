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
  searchTerm: string = '';
  categories: string[] = [];
  selectedCategory: string | null = null;
environment = environment;
  // Remove this as description is shown in modal now
  // showDescriptionMap: { [productId: number]: boolean } = {};

  private productService = inject(ProductService);

  // === Modal selected product ===
  selectedProduct: any = null;

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.categories = [...new Set(this.products.map(p => p.category).filter(Boolean))];
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  clearCategoryFilter() {
    this.selectedCategory = null;
  }

  filteredProducts() {
    let filtered = this.products;

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    return filtered;
  }

  // Remove toggleDescription and replace with modal open/close methods

  openDescription(product: any) {
    this.selectedProduct = product;
  }

  closeDescription() {
    this.selectedProduct = null;
  }
}



