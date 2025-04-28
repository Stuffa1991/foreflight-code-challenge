import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { WeatherReportService } from '@app/features/weather/services/weather-report.service';
import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';

export const weatherReportResolver: ResolveFn<
  IcaoReportRequestModel | IcaoReportRequestNotFoundModel | null
> = (route, state) => {
  const icaoCode = route.params['icaoCode'];

  if (!icaoCode) {
    console.error('No ICAO code provided in route parameters.');
    return null;
  }

  return inject(WeatherReportService).getWeatherReportByICAOCode(icaoCode);
};
