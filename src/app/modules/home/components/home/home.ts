import { Component } from '@angular/core';
import { Brands } from '../../../store/components/brands/brands';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-home',
  imports: [SHARED_MATERIAL_IMPORTS, Brands],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
