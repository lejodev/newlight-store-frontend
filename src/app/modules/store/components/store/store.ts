import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  imports: [CommonModule, SHARED_MATERIAL_IMPORTS],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store implements OnInit {

  products$!: Observable<IProduct[]>;

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products$ = this.storeService.getAllProducts('products')
    this.products$.subscribe(res => {console.log(res);
    })
  }

  selectProduct(id: number){
    console.log(id);
    this.router.navigate(['product', id])
  }

}
