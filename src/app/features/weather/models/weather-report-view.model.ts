import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';

export type WeatherReportViewModel =
  | IcaoReportRequestModel
  | IcaoReportRequestNotFoundModel
  | null;
