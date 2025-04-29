import {
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ROUTER_OUTLET_DATA, RouterLink } from '@angular/router';
import {
  WeatherReportViewModel,
  WeatherReportViewModelData,
} from '@app/features/weather/models/weather-report-view.model';
import { TypeIsIcaoReportNotFoundPipe } from '@app/features/weather/pipes/type-is-icao-report-not-found.pipe';
import { TypeIsIcaoReportPipe } from '@app/features/weather/pipes/type-is-icao-report.pipe';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WeatherReportService } from '@app/features/weather/services/weather-report.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-metar-component',
  imports: [
    TypeIsIcaoReportNotFoundPipe,
    TypeIsIcaoReportPipe,
    RouterLink,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './weather-report.component.html',
  styleUrl: './weather-report.component.scss',
  standalone: true,
})
export class WeatherReportComponent {
  weatherService = inject(WeatherReportService);
  weatherReportViewModel = inject(
    ROUTER_OUTLET_DATA
  ) as Signal<WeatherReportViewModel>;
  weatherReport: WritableSignal<WeatherReportViewModelData | null> =
    signal(null);
  isFetchingNewReport = signal(false);
  searchForm: FormGroup;
  previousSearches: WritableSignal<Set<string[]>> = signal(new Set([]));

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      icaoCode: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });
  }

  async onSubmit() {
    if (this.searchForm.valid) {
      try {
        this.isFetchingNewReport.update(() => true);
        this.weatherReport.update(() => null);
        const icaoCode = this.searchForm.get('icaoCode')?.value;
        const weatherReport =
          await this.weatherService.getWeatherReportByICAOCode(icaoCode);

        this.weatherReport.update(() => weatherReport);

        if (this.weatherService.isIcaoReportRequestModel(weatherReport)) {
          this.previousSearches.update(previousSearches => {
            previousSearches.add(icaoCode);
            return previousSearches;
          });
        }
      } finally {
        this.isFetchingNewReport.update(() => false);
      }
    }
  }
}
