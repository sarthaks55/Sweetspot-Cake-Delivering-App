import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'app-trackpage',
  standalone: true,
  imports: [],
  templateUrl: './trackpage.component.html',
  styleUrls: ['./trackpage.component.css']
})
export class TrackpageComponent implements OnInit {
  private defaultLatLng = { lat: 19.29, lng: 73.05 }; // Initial default values if needed

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.initMap(latlng);
      },
      error: (error) => {
        console.error('Error getting current location:', error);
        this.initMap(this.defaultLatLng); // Fallback to default location
      }
    });
  }

  initMap(latlng: { lat: number; lng: number }): void {
    const map = L.map('map').setView([latlng.lat, latlng.lng], 11);
    const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
      maxZoom: 18
    }).addTo(map);

    const icon = L.icon({
      iconUrl: 'https://img.icons8.com/?size=96&id=12868&format=png',
      iconSize: [70, 70]
    });

    const marker = L.marker([latlng.lat, latlng.lng], { icon: icon }).addTo(map);
    const nearbyCoordinates = this.calculateNearbyCoordinates(latlng);

    L.Routing.control({
      waypoints: [
        L.latLng(nearbyCoordinates.lat, nearbyCoordinates.lng),
        L.latLng(latlng.lat, latlng.lng)
      ]
    }).on('routesfound', (e) => {
      const routes = e.routes;
      console.log(routes);

      const routeCoordinates = e.routes[0].coordinates;

      let index = 0;
      const interval = setInterval(() => {
        const coord = routeCoordinates[index];
        marker.setLatLng([coord.lat, coord.lng]);

        index++;
        if (index >= routeCoordinates.length) {
          clearInterval(interval);
        }
      }, 120000 / routeCoordinates.length); // Calculate the interval for a total duration of 2 minutes

    }).addTo(map);
  }

  calculateNearbyCoordinates(latlng: { lat: number, lng: number }): { lat: number, lng: number } {
    const nearbyLat = latlng.lat + 0.04; // Adjust this value to set how far the nearby point should be
    const nearbyLng = latlng.lng + 0.04; // Adjust this value to set how far the nearby point should be

    return { lat: nearbyLat, lng: nearbyLng };
  }
}
