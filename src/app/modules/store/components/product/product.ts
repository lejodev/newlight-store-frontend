import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store';
import { ProductsService } from '../../services/products/products';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [SHARED_MATERIAL_IMPORTS, CommonModule],
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
})
export class ProductComponent implements OnInit {

  productId: string | null = null;
  product: IProduct | null = null;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.getRoute()
  }

  productName: string | null = null

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  getRoute() {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id')
      if (id) {
        this.isLoading = true;
        this.getProductDetails(id)
      } else {
        console.log('Error getting id');

      }
    })
  }

  getProductDetails(id: string) {
    this.productService.getSingleProduct(`products/${id}`).subscribe({
      next: (res) => {
        console.log('Product Details', res);
        this.product = res;
        this.isLoading = false; // ✅ FIX 2: Stop loading on success
        console.log(this.isLoading);
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
        this.product = null;
        this.isLoading = false; // ✅ FIX 3: Stop loading on error
      }
    })
  }

}
