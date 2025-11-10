import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store';
import { IBrand } from '../../../../shared/interfaces/brand.interface';
import { BrandsService } from '../../services/brands/brands';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
  standalone: true
})
export class Brands implements OnInit {

  brands$!: Observable<IBrand[]>;

  constructor(
    private brandsService: BrandsService
  ) { }

  ngOnInit(): void {
    this.brands$ = this.brandsService.getAllBrands('brands')
  }
}
