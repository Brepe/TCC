import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

declare var google: any;

@Component({
  selector: 'page-lista-prox',
  templateUrl: 'lista-prox.html'
})
export class listaProxPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  ref = firebase.database().ref('geolocations/');

  constructor(public navParams: NavParams,public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation,
    private device: Device) {
    platform.ready().then(() => {
      this.initMap();
    });
    console.log(this.markers);
    console.log("he");

    this.ref.on('value', resp => {
    //  this.deleteMarkers();
      snapshotToArray(resp).forEach(data => {
        //if(data.uuid !== this.device.uuid) {
          ///let image = 'assets/img/point.png';
          //let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          //this.addMarker(updatelocation,image);
          //this.setMapOnAll(this.map);
       // } else {
          let image = 'assets/img/point.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        //}
      });
    });
    console.log(this.markers);
  }

  initMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     // this.deleteMarkers();
      this.updateGeolocation(/*this.device.uuid,*/ data.coords.latitude,data.coords.longitude);
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/img/point.png';
      this.addMarker(updatelocation,image);
      this.setMapOnAll(this.map);
    });
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
    console.log(this.markers);
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  updateGeolocation(/*uuid, */lat, lng) {
    if(localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/'+localStorage.getItem('mykey')).set({
        //uuid: uuid,
        latitude: lat,
        longitude : lng
      });
    } else {
      let newData = this.ref.push();
      newData.set({
      //  uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('mykey', newData.key);
    }
  }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};

