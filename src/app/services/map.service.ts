import { Injectable } from '@angular/core';
import { MapOptions, Layer, TileLayer, TileLayerOptions, LatLng, Marker, LatLngBounds, Icon, IconOptions, DivIcon } from 'leaflet';
import { GeoData, Laboratory, LaboratoryMapData } from '../../core/interfaces/laboratory.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  getMapOptions({laboratories, geoData}: LaboratoryMapData): MapOptions {
    const {zoom, center} = geoData;
    return {
      zoom,
      layers: this.getLayers(laboratories),
      center: new LatLng(center.lat, center.lng)
    } as MapOptions;
  }

  getBounds(geoData: GeoData): LatLngBounds {
    const {minCoord, maxCoord} = geoData;
    return new LatLngBounds(new LatLng(maxCoord.lat, maxCoord.lng), new LatLng(minCoord.lat, minCoord.lng));
  }

  private getLayers(laboratories: Laboratory[]): Layer[] {
    return [
      this.getMapLayer(),
      ...this.getMarkerLayer(laboratories)
    ] as Layer[];
  }

  private getMapLayer(): Layer {
    return new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as TileLayerOptions);
  }

  private getMarkerLayer(laboratories: Laboratory[]): Layer[] {
    return laboratories.map(laboratory => {
      const latLng: LatLng = new LatLng(laboratory.coordination.lat, laboratory.coordination.lng);
      const marker = new Marker(latLng, {icon: new Icon({iconUrl: 'assets/icons/map.png'})});

      marker.bindPopup(this.getMarkerPopup(laboratory));

      return marker;
    });
  }
  private getMarkerPopup(laboratory: Laboratory): string {
    const {name, location, address, zipCode, info, telephone} = laboratory;
    return `
      <div>
      <h4>${name}</h4>
      <address>ul. ${address}<br>${zipCode} ${location}</address>
      Tel: <a href="tel:${telephone}">${telephone}</a>
      ${info ? '<p>Informacje: ' + info + '</p>' : ''}
      </div>
    `;
  }
}
