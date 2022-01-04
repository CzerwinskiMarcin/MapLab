import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MapOptions } from 'leaflet';

@Component({
  selector: 'app-lab-map',
  templateUrl: './lab-map.component.html',
  styleUrls: ['./lab-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabMapComponent {
  @Input() mapOptions: MapOptions;
}
