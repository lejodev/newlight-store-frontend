import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../modules/shopping_cart/services/cart-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {

  public cartService = inject(CartService)

}
