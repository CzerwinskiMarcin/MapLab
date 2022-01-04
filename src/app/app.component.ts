import { Component } from '@angular/core';
import { LabService } from './services/lab.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LatLngBounds, MapOptions } from 'leaflet';
import { MapService } from './services/map.service';
import { LaboratoryApiResponse } from '../core/interfaces/laboratory-api-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { LabMapperService } from './services/lab-mapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoadingMap: boolean;
  disableControls: boolean;
  sourceError: string;

  rawData: LaboratoryApiResponse;
  mapOptions: MapOptions;
  fitBounds: LatLngBounds;

  constructor(private labService: LabService, private mapService: MapService) {}

  onLink(link: string): void {
    this.resetData();

    this.labService.getFrom(link)
      .pipe(
        catchError(this.handlePipeError.bind(this)),
        tap(result => {
          this.rawData = LabMapperService.reverse(result);
          this.mapOptions = this.mapService.getMapOptions(result);
          this.fitBounds = this.mapService.getBounds(result.geoData);
        }),
        finalize(() => {
          this.isLoadingMap = false;
          this.disableControls = false;
        })
      )
      .subscribe()
    ;
  }

  private resetData(): void {
    this.isLoadingMap = true;
    this.disableControls = true;
    this.sourceError = '';
    this.mapOptions = null;
    this.rawData = null;
  }

  private handlePipeError(err: any): Observable<never> {
    if (err instanceof HttpErrorResponse) {
      this.sourceError = 'Nie można znaleźć zasobów';
    } else if (err instanceof Error) {
      this.sourceError = err.message;
    } else {
      this.sourceError = 'Coś poszło nie tak. Proszę spróbować ponownie bądź odpocząć ;)';
    }

    return throwError(`Coś poszło nie tak :/`);
  }
}
