import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherReportService {
  http = inject(HttpClient);
  headers = new HttpHeaders({
    'x-foreflight-odense': 'true',
  });

  async getWeatherReportByICAOCode(
    ICAOCode: string
  ): Promise<IcaoReportRequestModel | IcaoReportRequestNotFoundModel | null> {
    try {
      return await firstValueFrom(
        this.http
          .get<IcaoReportRequestModel>(`/weather/report/${ICAOCode}`, {
            headers: this.headers,
          })
          .pipe(
            catchError(error => {
              return throwError(() => error);
            })
          )
      );
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          console.error('Weather report not found for ICAO code:', ICAOCode);
          return error.error as IcaoReportRequestModel;
        }
      }

      throw error;
    }
  }
}
