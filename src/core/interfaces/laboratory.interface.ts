export interface LaboratoryMapData {
  laboratories: Laboratory[];
  geoData: GeoData;
}

export interface Laboratory {
  id: number;
  name: string;
  address: string;
  zipCode: string;
  location: string;
  telephone: string;
  coordination: Coordination;
  info?: any;
}

export interface Coordination {
  lat: number;
  lng: number;
}

export interface GeoData {
  minCoord: Coordination;
  maxCoord: Coordination;
  center: Coordination;
  zoom: number;
}
