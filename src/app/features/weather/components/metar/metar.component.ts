import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { WeatherReportViewModel } from '@app/features/weather/models/weather-report-view.model';
import { WeatherReportComponent } from '@app/shared/components/weather-report/weather-report.component';

@Component({
  selector: 'app-metar-component',
  imports: [WeatherReportComponent],
  templateUrl: './metar.component.html',
  styleUrl: './metar.component.scss',
  standalone: true,
})
export class MetarComponent {
  weatherReport = inject(ROUTER_OUTLET_DATA) as Signal<WeatherReportViewModel>;
}
