import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FlightService {

    http = inject(HttpClient);

    baseUrl = 'https://freeapi.miniprojectideas.com/api/FlightBooking';


    getAirports(){
        return this.http.get<any>(`${this.baseUrl}/GetAllAirport`);
    }

    searchFlights(from:number, to:number, date:string){
        return this.http.get<any>(
            `${this.baseUrl}/SearchFlight?departureAirportId=${from}&arrivalAirportId=${to}&dateOfTravel=${date}`
    );
    }

    getAllFlights(){
            return this.http.get<any>(
                `${this.baseUrl}/GetAllFlights`
        );
    };
    getMyBookings(){
        return this.http.get<any>(
        `${this.baseUrl}/GetAllFlightBooking`
    );
    }

    getAllBookings(){
        return this.http.get<any>(
    `${this.baseUrl}/GetAllFlightBooking`
);
}
bookTicket(data:any){
  return this.http.post(
    'https://freeapi.miniprojectideas.com/api/FlightBooking/BookTicket',
    data
  );
}



addAirport(data:any[]){
  return this.http.post<any>(
    'https://freeapi.miniprojectideas.com/api/FlightBooking/AddUpdateBulkAirports',
    data
  );
}

deleteAirport(id:number){
  return this.http.delete<any>(
    `https://freeapi.miniprojectideas.com/api/FlightBooking/DeleteAirportById?airportId=${id}`
  );
}




getVendors(){
  return this.http.get<any>(
    'https://freeapi.miniprojectideas.com/api/FlightBooking/GetAllVendors'
  );
}



addFlight(data:any){
  return this.http.post<any>(
    'https://freeapi.miniprojectideas.com/api/FlightBooking/AddUpdateBulkFlights',
    [data]   // API expects array
  );
}

deleteFlight(id:number){
  return this.http.delete<any>(
    `https://freeapi.miniprojectideas.com/api/FlightBooking/DeleteFlightById?flightId=${id}`
  );
}


getAllCustomers(){
  return this.http.get<any>(
    'https://freeapi.miniprojectideas.com/api/FlightBooking/GetAllCustomer'
  );
}
}
