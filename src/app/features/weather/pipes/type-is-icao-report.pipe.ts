import { Pipe, PipeTransform } from '@angular/core';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';
import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';

@Pipe({
  name: 'TypeIsIcaoReport',
  standalone: true,
})
export class TypeIsIcaoReportPipe implements PipeTransform {
  transform(
    model: IcaoReportRequestNotFoundModel | IcaoReportRequestModel
  ): model is IcaoReportRequestModel {
    return 'report' in model;
  }
}
