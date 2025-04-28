import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { weatherReportResolver } from './weather-report.resolver';

describe('weatherReportResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      weatherReportResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
