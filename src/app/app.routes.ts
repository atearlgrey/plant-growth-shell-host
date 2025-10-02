import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'plant-growth',
    loadComponent: () => import('./plant-growth/plant-growth.component').then(m => m.PlantGrowthComponent)
  }
];
