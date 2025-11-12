import { Routes } from '@angular/router';
import { Home } from './modules/home/components/home/home';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: Home,
            },
            {
                path: 'store',
                loadComponent: () => import('./modules/store/components/store/store').then(m => m.Store)
            },
            {
                path: 'product/:id',
                loadComponent: () => import('./modules/store/components/product/product').then(m => m.ProductComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('./modules/shopping_cart/components/cart/cart/cart').then(m => m.Cart)
            }
        ]
    }
];
