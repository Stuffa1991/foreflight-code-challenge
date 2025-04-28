import { Component, Input, signal, WritableSignal } from '@angular/core';
import { WeatherReportViewModel } from '@app/features/weather/models/weather-report-view.model';
import { TypeIsIcaoReportPipe } from '@app/features/weather/pipes/type-is-icao-report.pipe';
import { TypeIsIcaoReportNotFoundPipe } from '@app/features/weather/pipes/type-is-icao-report-not-found.pipe';
import { WeatherReportTypes } from '@app/features/weather/models/weather-report-types.model';

@Component({
  selector: 'app-weather-report',
  imports: [TypeIsIcaoReportPipe, TypeIsIcaoReportNotFoundPipe],
  templateUrl: './weather-report.component.html',
  styleUrl: './weather-report.component.scss',
})
export class WeatherReportComponent {
  weatherReport: WritableSignal<WeatherReportViewModel> = signal(null);
  weatherReportType: WritableSignal<WeatherReportTypes | null> = signal(null);

  @Input() set weatherReportInput(value: WeatherReportViewModel) {
    this.weatherReport.set(value);
  }

  @Input() set weatherReportTypeInput(value: WeatherReportTypes) {
    this.weatherReportType.set(value);
  }
}
