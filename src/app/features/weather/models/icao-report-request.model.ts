export interface IcaoReportRequestModel {
  report: Report;
}

export interface Report {
  conditions: Conditions;
  forecast: Forecast;
  windsAloft: unknown;
  mos: unknown;
  atis: Ati[];
}

export interface Conditions {
  text: string;
  ident: string;
  dateIssued: string;
  lat: number;
  lon: number;
  elevationFt: number;
  tempC: number;
  dewpointC: number;
  pressureHg: number;
  pressureHpa: number;
  reportedAsHpa: boolean;
  densityAltitudeFt: number;
  relativeHumidity: number;
  flightRules: string;
  cloudLayers: CloudLayer[];
  cloudLayersV2: CloudLayerV2[];
  weather: string[];
  visibility: Visibility;
  wind: Wind;
  remarks: Remarks;
}

export interface CloudLayer {
  coverage: string;
  altitudeFt: number;
  ceiling: boolean;
}

export interface CloudLayerV2 {
  coverage: string;
  altitudeFt: number;
  ceiling: boolean;
}

export interface Visibility {
  distanceSm: number;
  prevailingVisSm: number;
}

export interface Wind {
  speedKts: number;
  direction: number;
  from: number;
  variable: boolean;
}

export interface Remarks {
  precipitationDiscriminator: boolean;
  humanObserver: boolean;
  seaLevelPressure: number;
  temperature: number;
  dewpoint: number;
  visibility: RemarkVisibility;
  sensoryStatus: unknown[];
  lightning: unknown[];
  weatherBeginEnds: RemarkWeatherBeginEnds;
  clouds: unknown[];
  obscuringLayers: unknown[];
}

// Empty in request
export type RemarkVisibility = object;

// Empty in request
export type RemarkWeatherBeginEnds = object;

export interface Forecast {
  text: string;
  ident: string;
  dateIssued: string;
  period: Period;
  lat: number;
  lon: number;
  elevationFt: number;
  conditions: Condition[];
}

export interface Period {
  dateStart: string;
  dateEnd: string;
}

export interface Condition {
  text: string;
  dateIssued: string;
  lat: number;
  lon: number;
  elevationFt: number;
  relativeHumidity: number;
  flightRules: string;
  cloudLayers: CloudLayer[];
  cloudLayersV2: CloudLayerV2[];
  weather: unknown[];
  visibility: ConditionVisibility;
  wind: ConditionWind;
  period: ConditionPeriod;
}

export interface ConditionVisibility {
  distanceSm: number;
  distanceQualifier: number;
  prevailingVisSm: number;
  prevailingVisDistanceQualifier: number;
}

export interface ConditionWind {
  speedKts: number;
  direction: number;
  from: number;
  variable: boolean;
  gustSpeedKts?: number;
}

export interface ConditionPeriod {
  dateStart: string;
  dateEnd: string;
}

export interface Ati {
  text: string;
  ident: string;
  dateIssued: string;
  letter: string;
  conditions: AtiConditions;
}

export interface AtiConditions {
  text: string;
  ident: string;
  tempC: number;
  dewpointC: number;
  pressureHg: number;
  pressureHpa: number;
  reportedAsHpa: boolean;
  relativeHumidity: number;
  flightRules: string;
  cloudLayers: CloudLayer[];
  cloudLayersV2: CloudLayerV2[];
  weather: unknown[];
  visibility: AtiVisibility;
  wind: AtiWind;
}

export interface AtiVisibility {
  distanceSm: number;
  prevailingVisSm: number;
}

export interface AtiWind {
  speedKts: number;
  direction: number;
  from: number;
  variable: boolean;
}
