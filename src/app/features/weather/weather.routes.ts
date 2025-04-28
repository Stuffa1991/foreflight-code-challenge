import { Routes } from '@angular/router';
import { weatherReportResolver } from '@app/features/weather/resolvers/weather-report.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/weather/weather.component').then(
        component => component.WeatherComponent
      ),
    resolve: {
      weatherReport: weatherReportResolver,
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/default/default.component').then(
            component => component.DefaultComponent
          ),
        data: {
          isDefaultView: true,
        },
      },
      {
        path: 'metar',
        loadComponent: () =>
          import('./components/metar/metar.component').then(
            component => component.MetarComponent
          ),
      },
      {
        path: 'metar/:icaoCode',
        loadComponent: () =>
          import('./components/metar/metar.component').then(
            component => component.MetarComponent
          ),
      },
      {
        path: 'taf',
        loadComponent: () =>
          import('./components/taf/taf.component').then(
            component => component.TafComponent
          ),
      },
      {
        path: 'taf/:icaoCode',
        loadComponent: () =>
          import('./components/taf/taf.component').then(
            component => component.TafComponent
          ),
      },
      {
        path: 'full',
        loadComponent: () =>
          import('./components/full/full.component').then(
            component => component.FullComponent
          ),
      },
      {
        path: 'full/:icaoCode',
        loadComponent: () =>
          import('./components/full/full.component').then(
            component => component.FullComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/metar/metar.component').then(
        component => component.MetarComponent
      ),
  },
];
