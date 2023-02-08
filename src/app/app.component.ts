import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  currentNetworkStatus: boolean = false;
  networkConnectionWifi: boolean = false;

  constructor() {}

  ngOnInit(): void {

    Network.getStatus().then(currentStatus =>{
      this.currentNetworkStatus = currentStatus.connected;
      if (currentStatus.connectionType === 'wifi') {
        // Only start syncing pictures if the user wants wifi syncing and the network connection is wifi
        this.networkConnectionWifi = true;
      } else {
        this.networkConnectionWifi = false;
      }
      console.log(currentStatus.connected, currentStatus.connectionType)
    });
    // Listen to network changes
    Network.addListener('networkStatusChange', status => {
      if (status.connectionType === 'wifi') {
        // Only start syncing pictures if the user wants wifi syncing and the network connection is wifi
        this.networkConnectionWifi = true;
        console.log('wifi is on',status.connectionType);
      } else {
        this.networkConnectionWifi = false;
        console.log('wifi is off',status.connectionType);
      }
      // Check connection status
      this.currentNetworkStatus = status.connected;
      console.log(status.connected, status.connectionType)
    });
  }
}
