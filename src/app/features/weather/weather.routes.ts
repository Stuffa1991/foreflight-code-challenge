import { Routes } from '@angular/router';
import { weatherReportResolver } from '@app/features/weather/resolvers/weather-report.resolver';

export const routes: Routes = [
  {
    path: ':icaoCode',
    loadComponent: () =>
      import('./components/weather/weather.component').then(
        component => component.WeatherComponent
      ),
    resolve: {
      weatherReport: weatherReportResolver,
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/weather/weather.component').then(
        component => component.WeatherComponent
      ),
  },
];
