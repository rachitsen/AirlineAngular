import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../../core/services/flight.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-ticket',
  imports: [FormsModule],
  templateUrl: './book-ticket.html',
  styleUrl: './book-ticket.css',
})
export class BookTicket {

    route = inject(ActivatedRoute);
    router = inject(Router);
    flightService = inject(FlightService);

    flightId = 0;
    flight = signal<any>(null);

    passengers = signal<any[]>([
      {name:'', contact:'',aadhar:'',seatNo:1}
    ])

    constructor(){
      this.flightId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadFlight();
    }

    loadFlight(){
      this.flightService.getAllFlights().subscribe(res=>{
        const found = res.data.find((f:any)=> f.flightId === this.flightId);
        this.flight.set(found);
      })
    }

    addPassenger(){
      this.passengers.update(p=>[
      ...p,
      {name:'', contact:'', aadhar:'', seatNo:p.length+1}
      ]);
    }

    removePassenger(i:number){
      this.passengers.update( p => p.filter((_,index)=>index!==i));
    }

    confirmBooking(){

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if(!user.userId){
    alert("Login again");
    return;
  }

  const selectedFlight = this.flight();

  if(!selectedFlight){
    alert("Flight not found");
    return;
  }

  const body = {
    flightId: this.flightId,
    customerId: user.userId,
    bookingDate: new Date().toISOString(),
    totalAmount: selectedFlight.price,

    FlightBookingTravelers: this.passengers().map(p => ({
      travelerName: p.name,
      contactNo: p.contact,
      aadharNo: p.aadhar,
      seatNo: Number(p.seatNo)
    }))
  };

  console.log("BOOKING BODY 👉", body);

  this.flightService.bookTicket(body).subscribe({
    next:(res:any)=>{
      console.log("BOOK RESPONSE", res);

      if(res.result){
        alert("🔥 Booking Successful");
        this.router.navigateByUrl('/my-bookings');
      }else{
        alert("Booking failed");
      }
    },
    error:()=>{
      alert("Server error booking failed");
    }
  });
}
}
