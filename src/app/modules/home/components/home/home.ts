import { Component } from '@angular/core';
import { Brands } from '../../../store/components/brands/brands';

@Component({
  selector: 'app-home',
  imports: [Brands],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
