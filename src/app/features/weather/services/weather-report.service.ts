import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, firstValueFrom, tap, throwError } from 'rxjs';
import { IcaoReportRequestModel } from '@app/features/weather/models/icao-report-request.model';
import { IcaoReportRequestNotFoundModel } from '@app/features/weather/models/icao-report-request-not-found.model';
import { CacheService } from '@app/core/services/cache.service';

const wait = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

const fakedLookupTable: Record<string, string> = {
  EKHG: 'EKKA',
  EKST: 'EKOD',
  EKVH: 'EKYT',
};

@Injectable({
  providedIn: 'root',
})
export class WeatherReportService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private headers = new HttpHeaders({
    'x-foreflight-odense': 'true',
  });

  async getWeatherReportByICAOCode(
    ICAOCode: string
  ): Promise<IcaoReportRequestModel | IcaoReportRequestNotFoundModel | null> {
    // Simulate a delay for demonstration purposes
    await wait(2000);

    const matchedICAOCode =
      fakedLookupTable[ICAOCode.toUpperCase()] || ICAOCode.toUpperCase();

    const cachedResponse =
      this.cacheService.getFromCache<IcaoReportRequestModel>(ICAOCode);
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      return await firstValueFrom(
        this.http
          .get<IcaoReportRequestModel>(`/weather/report/${matchedICAOCode}`, {
            headers: this.headers,
          })
          .pipe(
            catchError(error => {
              return throwError(() => error);
            }),
            tap((response: IcaoReportRequestModel) => {
              if (response.report) {
                this.cacheService.updateCache(matchedICAOCode, response);
              }

              return response;
            })
          )
      );
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          console.error(
            'Weather report not found for ICAO code:',
            matchedICAOCode
          );
          return error.error as IcaoReportRequestNotFoundModel;
        }
      }

      throw error;
    }
  }

  isIcaoReportRequestModel(
    report: IcaoReportRequestModel | IcaoReportRequestNotFoundModel | null
  ): report is IcaoReportRequestModel {
    return (report && 'report' in report) || false;
  }
}
