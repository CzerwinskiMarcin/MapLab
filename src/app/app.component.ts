import { Component } from '@angular/core';
import { LabService } from './services/lab.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MapOptions } from 'leaflet';
import { MapService } from './services/map.service';
import { LaboratoryApiResponse } from '../core/interfaces/laboratory-api-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private labService: LabService, private mapService: MapService) {}

  onLink(link: string): void {
    this.isLoadingMap = true;
    this.disableControls = true;
    this.sourceError = '';
    this.mapOptions = null;
    this.rawData = null;

    this.labService.getFrom(link)
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            this.sourceError = 'Nie można znaleźć zasobów';
          } else if (err instanceof Error) {
            this.sourceError = err.message;
          } else {
            this.sourceError = 'Coś poszło nie tak. Proszę spróbować ponownie bądź odpocząć ;)';
          }

          return throwError(`Coś poszło nie tak :/`);
        }),
        tap(result => {
          this.rawData = result;
          this.mapOptions = this.mapService.getMapOptions(result);
        }),
        finalize(() => {
          this.isLoadingMap = false;
          this.disableControls = false;
        })
      )
      .subscribe()
    ;
  }
}
