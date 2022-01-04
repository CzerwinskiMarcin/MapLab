import { Injectable } from '@angular/core';
import {
  CoordinationMetadata,
  Laboratory as RawLaboratory,
  LaboratoryApiResponse
} from '../../core/interfaces/laboratory-api-response.interface';
import { Coordination, GeoData, Laboratory, LaboratoryMapData } from '../../core/interfaces/laboratory.interface';
import { isCoordinationMetadata } from '../../core/guards/laboratory.guard';

@Injectable({
  providedIn: 'root'
})
export class LabMapperService {
  static convert(laboratoriesData: LaboratoryApiResponse): LaboratoryMapData {
    return {
      laboratories: laboratoriesData.laboatoria.map(LabMapperService.convertLaboratory),
      geoData: LabMapperService.convertGeoData(laboratoriesData.cords)
    } as LaboratoryMapData;
  }

  private static convertLaboratory(laboratory: RawLaboratory): Laboratory {
    const {id, nazwa, kod_pocztowy, miejscowosc, adres, tel, gps_lat, gps_lng, info} = laboratory;
    const coordination: Coordination = {lat: gps_lat, lng: gps_lng};

    return {
      id,
      name: nazwa,
      zipCode: kod_pocztowy,
      location: miejscowosc,
      address: adres,
      telephone: tel,
      coordination,
      info
    } as Laboratory;
  }

  private static convertGeoData(coords: CoordinationMetadata): GeoData {
    if (!isCoordinationMetadata(coords)) {
      throw new Error('The API response for coordination metadata is not supported');
    }

    const {min_lat, max_lat, min_lng, max_lng, zoom} = coords;

    const center: Coordination = {
      lat: (max_lat + min_lat) / 2,
      lng: (max_lng + min_lng) / 2
    };

    const minCoord: Coordination = {
      lat: min_lat,
      lng: min_lng
    };

    const maxCoord: Coordination = {
      lat: max_lat,
      lng: max_lng
    };

    return {
      minCoord,
      maxCoord,
      center,
      zoom
    };
  }
}
