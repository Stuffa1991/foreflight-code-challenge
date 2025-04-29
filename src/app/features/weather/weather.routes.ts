import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/weather/weather.component').then(
        component => component.WeatherComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/default/default.component').then(
            component => component.DefaultComponent
          ),
      },
      {
        path: ':reportType',
        loadComponent: () =>
          import('./components/weather-report/weather-report.component').then(
            component => component.WeatherReportComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/default/default.component').then(
        component => component.DefaultComponent
      ),
  },
];
