import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'weather',
    loadChildren: () =>
      import('./features/weather/weather.routes').then(
        component => component.routes
      ),
  },
  {
    path: '**',
    redirectTo: 'weather',
  },
];
