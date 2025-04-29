import {
  Component,
  computed,
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
  RouterOutlet,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeatherReportViewModel } from '@app/features/weather/models/weather-report-view.model';
import { WeatherReportTypes } from '@app/features/weather/models/weather-report-types.model';

@Component({
  selector: 'app-weather',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  weatherReportType: WritableSignal<WeatherReportTypes | null> = signal(null);
  routerOutletData: Signal<WeatherReportViewModel> = computed(() => ({
    weatherReportType: this.weatherReportType() ?? null,
  }));

  ngOnInit() {
    this.updateViewData();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateViewData();
      }
    });
  }

  updateViewData() {
    const reportType: WeatherReportTypes =
      this.activatedRoute.firstChild?.snapshot.params[
        'reportType'
      ]?.toUpperCase();

    this.weatherReportType.set(reportType);
  }
}
