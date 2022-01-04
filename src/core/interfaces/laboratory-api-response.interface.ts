export interface LaboratoryApiResponse {
  laboatoria: Laboratory[];
  cords: CoordinationMetadata;
}

export interface Laboratory {
  id: number;
  nazwa: string;
  adres: string;
  kod_pocztowy: string;
  miejscowosc: string;
  tel: string;
  gps_lat: number;
  gps_lng: number;
  info?: any;
}

export interface CoordinationMetadata {
  min_lat: number;
  max_lat: number;
  avg_lat: number;
  min_lng: number;
  max_lng: number;
  avg_lng: number;
  zoom: number;
}
