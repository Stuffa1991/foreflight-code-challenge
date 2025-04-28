import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';
import { TypeIsIcaoReportPipe } from '@app/features/weather/pipes/type-is-icao-report.pipe';
import { TypeIsIcaoReportNotFoundPipe } from '@app/features/weather/pipes/type-is-icao-report-not-found.pipe';

@Component({
  selector: 'app-weather-component',
  imports: [TypeIsIcaoReportPipe, TypeIsIcaoReportNotFoundPipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  standalone: true,
})
export class WeatherComponent {
  private activatedRoute = inject(ActivatedRoute);

  weatherReport: Signal<
    IcaoReportRequestModel | IcaoReportRequestNotFoundModel | null
  > = toSignal(
    this.activatedRoute.data.pipe(
      map(data => data['weatherReport']),
      catchError(() => of(null)) // Handle errors by returning null
    ),
    { initialValue: null } // Provide an initial value to ensure type compatibility
  );
}
