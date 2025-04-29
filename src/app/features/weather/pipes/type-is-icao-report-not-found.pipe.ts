import { Pipe, PipeTransform } from '@angular/core';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';
import { WeatherReportViewModelData } from '@app/features/weather/models/weather-report-view.model';

@Pipe({
  name: 'TypeIsIcaoReportNotFound',
  standalone: true,
})
export class TypeIsIcaoReportNotFoundPipe implements PipeTransform {
  transform(
    model: WeatherReportViewModelData
  ): model is IcaoReportRequestNotFoundModel {
    if (!model) return false;

    return 'status' in model && model.status === 404;
  }
}
