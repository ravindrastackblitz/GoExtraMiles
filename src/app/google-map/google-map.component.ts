import { Component, ElementRef, NgZone, OnInit, ViewChild,Output,EventEmitter,Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {Location} from '../Model/location';

declare var google:any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent {
  public latitude!: number;
  public longitude!: number;
  public searchControl!: FormControl;
  public zoom!: number;
  location!:Location;

  @ViewChild("search") public searchElementRef!: ElementRef;
  @Output() Searchdata:EventEmitter<any> =new EventEmitter()
  @Input('locationdetails') locationdata!:Location;

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone) {}
  
  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    //create search FormControl
    this.searchControl = new FormControl();
    //set current position
    this.setCurrentPosition();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
                
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          //set latitude, longitude and zoom
          this.zoom = 12;

          if(this.location == undefined || this.location == null){
            this.setCurrentPosition();
            this.location ={
              latitude:this.latitude,
              longitude :this.longitude
            }
            this.Searchdata.emit(this.location);
          }else{
            this.location ={
              latitude:this.latitude,
              longitude :this.longitude
            }
            this.Searchdata.emit(this.location);
          }
        });
      });
    });
  }
  
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.location ={
          latitude:this.latitude,
          longitude :this.longitude
        }
        this.Searchdata.emit(this.location);
      });
    }
  }

  ngOnChanges():void
  {

    this.latitude = this.locationdata?.latitude;
    this.longitude = this.locationdata?.longitude;
  }
}
