import { Pipe, PipeTransform } from '@angular/core';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';
import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';

@Pipe({
  name: 'TypeIsIcaoReportNotFound',
  standalone: true,
})
export class TypeIsIcaoReportNotFoundPipe implements PipeTransform {
  transform(
    model: IcaoReportRequestNotFoundModel | IcaoReportRequestModel
  ): model is IcaoReportRequestNotFoundModel {
    return 'status' in model && model.status === 404;
  }
}
