import { CoordinationMetadata, Laboratory, LaboratoryApiResponse } from '../interfaces/laboratory-api-response.interface';

export function isLaboratoryApiResponse(apiResponse: any): apiResponse is LaboratoryApiResponse {
  const schema: Record<keyof LaboratoryApiResponse, string> = {
    laboatoria: 'object',
    cords: 'object',
  };

  try {
    compareWithSchema(apiResponse, schema);
  } catch (err) {
    throw new Error('Api response is not supported');
  }

  return isCoordinationMetadata(apiResponse.cords) && (!apiResponse.laboatoria.length || isLaboratory(apiResponse.laboatoria[0]));
}

export function isCoordinationMetadata(data: any): data is CoordinationMetadata {
  const schema: Record<keyof CoordinationMetadata, string> = {
    min_lat: 'number',
    min_lng: 'number',
    max_lng: 'number',
    max_lat: 'number',
    avg_lng: 'number',
    avg_lat: 'number',
    zoom: 'number',
  };

  try {
    return compareWithSchema(data, schema);
  } catch (err) {
    throw new Error('API response for CoordinationMetadata is not supported');
  }
}

export function isLaboratory(data: any): data is Laboratory {
  // @ts-ignore
  const schema: Record<keyof Laboratory, string> = {
    id: 'number',
    nazwa: 'string',
    kod_pocztowy: 'string',
    adres: 'string',
    miejscowosc: 'string',
    tel: 'string',
    gps_lat: 'number',
    gps_lng: 'number'
  };

  try {
    return compareWithSchema(data, schema);
  } catch (err) {
    throw new Error('API response for Laboratory is not supported');
  }
}

function compareWithSchema<T>(data: any, schema: Record<keyof T, string>): boolean {
  const missingProperties = Object.keys(schema)
    .filter(key => data[key] === undefined || typeof data[key] !== schema[key])
    .map(key => key as keyof CoordinationMetadata);

  if (missingProperties.length) {
    throw new Error();
  }

  return true;
}
