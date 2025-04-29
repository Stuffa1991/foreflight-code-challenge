import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';
import { WeatherReportTypes } from '@app/features/weather/models/weather-report-types.model';

export interface WeatherReportViewModel {
  weatherReportType: WeatherReportTypes | null;
}

export type WeatherReportViewModelData =
  | IcaoReportRequestModel
  | IcaoReportRequestNotFoundModel
  | null;
