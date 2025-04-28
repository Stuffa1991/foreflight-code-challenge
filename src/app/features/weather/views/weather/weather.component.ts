import {
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  private activatedRoute = inject(ActivatedRoute);
  activeICAO: WritableSignal<string | null> = signal(null);

  weatherReport: Signal<
    IcaoReportRequestModel | IcaoReportRequestNotFoundModel | null
  > = toSignal(
    this.activatedRoute.data.pipe(
      map(data => data['weatherReport']),
      catchError(() => of(null))
    ),
    { initialValue: null }
  );
}
