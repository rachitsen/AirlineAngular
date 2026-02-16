import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlightService } from '../../../core/services/flight.service';
@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
     flightService = inject(FlightService);

  totalFlights = signal(0);
  totalBookings = signal(0);
  totalUsers = signal(0);

  bookingsPerFlight = signal<any[]>([]);

  constructor(){
    this.loadDashboard();
  }

  loadDashboard(){

    // flights count
    this.flightService.getAllFlights().subscribe(res=>{
      if(res.result){
        this.totalFlights.set(res.data.length);
      }
    });

    // bookings count
    this.flightService.getAllBookings().subscribe(res=>{
      if(res.result){
        this.totalBookings.set(res.data.length);

        // bookings per flight
        const map:any = {};

        res.data.forEach((b:any)=>{
          map[b.flightNumber] = (map[b.flightNumber] || 0) + 1;
        });

        const arr = Object.keys(map).map(k=>({
          flight:k,
          count:map[k]
        }));

        this.bookingsPerFlight.set(arr);
      }
    });

    // users count
    this.flightService.getAllCustomers().subscribe(res=>{
      if(res.result){
        this.totalUsers.set(res.data.length);
      }
    });
  }
  logout(){
    
  }
}
