import { Component, inject, signal } from '@angular/core';
import { FlightService } from '../../../core/services/flight.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flights-admin',
  imports: [FormsModule, DatePipe],
  templateUrl: './flights-admin.html',
  styleUrl: './flights-admin.css',
})
export class FlightsAdmin {
    
  flightService = inject(FlightService);

  airports = signal<any[]>([]);
  vendors = signal<any[]>([]);
  flights = signal<any[]>([]);

  newFlight:any = {
    flightId:0,
    flightNumber:'',
    departureAirportId:0,
    arrivalAirportId:0,
    departureTime:'',
    arrivalTime:'',
    price:0,
    totalSeats:0,
    flightVendorId:0,
    travelDate:''
  };

  constructor(){
    this.loadAirports();
    this.loadVendors();
    this.loadFlights();
  }

  loadAirports(){
    this.flightService.getAirports().subscribe(res=>{
      if(res.result){
        this.airports.set(res.data);
      }
    });
  }

  loadVendors(){
    this.flightService.getVendors().subscribe(res=>{
      if(res.result){
        this.vendors.set(res.data);
      }
    });
  }

  loadFlights(){
    this.flightService.getAllFlights().subscribe(res=>{
      if(res.result){
        this.flights.set(res.data);
      }
    });
  }

  addFlight(){
    if(!this.newFlight.flightNumber){
      alert("Enter flight number");
      return;
    }

    this.flightService.addFlight(this.newFlight).subscribe(res=>{
      if(res.result){
        alert("Flight Added ✈️");
        this.loadFlights();

        this.newFlight = {
          flightId:0,
          flightNumber:'',
          departureAirportId:0,
          arrivalAirportId:0,
          departureTime:'',
          arrivalTime:'',
          price:0,
          totalSeats:0,
          flightVendorId:0,
          travelDate:''
        };
      }
    });
  }

  deleteFlight(id:number){
    if(!confirm("Delete flight?")) return;

    this.flightService.deleteFlight(id).subscribe(res=>{
      if(res.result){
        alert("Deleted");
        this.loadFlights();
      }
    });
  }
}
