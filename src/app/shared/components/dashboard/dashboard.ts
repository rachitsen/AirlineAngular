import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FlightService } from '../../../core/services/flight.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  // injections
  auth = inject(AuthService);
  router = inject(Router);
  flightService = inject(FlightService);

  // current logged user
  user = this.auth.currentUser;

  // signals (Angular 21 modern)
  airports = signal<any[]>([]);
  flights = signal<any[]>([]);
  travelDate = signal<string>('');

  fromAirport = signal<number>(0);
  toAirport = signal<number>(0);

  constructor(){
    this.loadAirports();
  }

  // load airports dropdown
  loadAirports(){
    this.flightService.getAirports().subscribe(res=>{
      if(res.result){
        this.airports.set(res.data);
      }
    })
  }

  // search flights
  searchFlights(){

    if(!this.fromAirport() || !this.toAirport() || !this.travelDate()){
      alert("Please select all fields");
      return;
    }

    this.flightService
      .searchFlights(
        this.fromAirport(),
        this.toAirport(),
        this.travelDate()
      )
      .subscribe(res=>{
        if(res.result){
          this.flights.set(res.data);
        }else{
          this.flights.set([]);
          alert("No flights found");
        }
      })
  }

  bookFlight(flightId:number){
  alert("Booking flight id: " + flightId);
  this.router.navigate(['/book', flightId]);
}

  // logout
  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
