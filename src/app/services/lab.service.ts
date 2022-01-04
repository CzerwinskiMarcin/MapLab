import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LabMapperService } from './lab-mapper.service';
import { isLaboratoryApiResponse } from '../../core/guards/laboratory.guard';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private http: HttpClient) {}

  getFrom(source: string): Observable<any> {
    return this.http.get(source)
      .pipe(
        tap(isLaboratoryApiResponse),
        map(LabMapperService.convert)
      );
  }
}
