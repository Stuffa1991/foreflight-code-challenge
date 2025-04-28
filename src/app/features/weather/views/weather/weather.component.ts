import {
  Component,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { WeatherReportViewModel } from '@app/features/weather/models/weather-report-view.model';

@Component({
  selector: 'app-weather',
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isDefaultView: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.updateIsDefaultView();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateIsDefaultView();
      }
    });
  }

  weatherReport: Signal<WeatherReportViewModel> = toSignal(
    this.activatedRoute.data.pipe(
      map(data => data['weatherReport']),
      catchError(() => of(null))
    ),
    { initialValue: null }
  );

  updateIsDefaultView() {
    this.isDefaultView.set(
      !!this.activatedRoute.firstChild?.snapshot.data['isDefaultView']
    );
  }
}
