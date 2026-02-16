import { Component, inject, signal } from '@angular/core';
import { FlightService } from '../../../core/services/flight.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './my-booking.html',
  styleUrl: './my-booking.css',
})
export class MyBooking {

  flightService = inject(FlightService);
  router = inject(Router);

  bookings = signal<any[]>([]);
  user:any;

  constructor(){
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadBookings();
  }

loadBookings(){
  this.flightService.getAllBookings().subscribe(res=>{

    if(res.result){

      console.log("USER 👉", this.user.name);
      console.log("ALL BOOKINGS 👉", res.data);

      const myBookings = res.data.filter((b:any)=>
        b.customerName?.toLowerCase().trim() === this.user.name?.toLowerCase().trim()
      );

      console.log("MY BOOKINGS 👉", myBookings);

      this.bookings.set(myBookings);
    }

  });
}


}
