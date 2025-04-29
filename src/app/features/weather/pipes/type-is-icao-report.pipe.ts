import { Pipe, PipeTransform } from '@angular/core';
import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';
import { WeatherReportViewModelData } from '@app/features/weather/models/weather-report-view.model';

@Pipe({
  name: 'TypeIsIcaoReport',
  standalone: true,
})
export class TypeIsIcaoReportPipe implements PipeTransform {
  transform(
    model: WeatherReportViewModelData
  ): model is IcaoReportRequestModel {
    if (!model) return false;

    return 'report' in model;
  }
}
