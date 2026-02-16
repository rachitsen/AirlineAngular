import { Component, inject, signal } from '@angular/core';
import { FlightService } from '../../../core/services/flight.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-airports-admin',
  imports: [FormsModule],
  templateUrl: './airports-admin.html',
  styleUrl: './airports-admin.css',
})
export class AirportsAdmin {
   flightService = inject(FlightService);

  airports = signal<any[]>([]);

  newAirport = {
    airportId: 0,
    airportCode: '',
    airportName: '',
    cityId: 0
  };

  constructor(){
    this.loadAirports();
  }

  // load airports
  loadAirports(){
    this.flightService.getAirports().subscribe(res=>{
      if(res.result){
        this.airports.set(res.data);
      }
    });
  }

  // add airport
  addAirport(){
    if(!this.newAirport.airportName || !this.newAirport.airportCode){
      alert("Fill all fields");
      return;
    }

    this.flightService.addAirport([this.newAirport]).subscribe(res=>{
      if(res.result){
        alert("Airport added");
        this.newAirport = {airportId:0, airportCode:'', airportName:'', cityId:0};
        this.loadAirports();
      }
    });
  }

  // delete airport
  deleteAirport(id:number){
  if(confirm("Delete airport?")){
    this.flightService.deleteAirport(id).subscribe(res=>{
      if(res.result){
        alert("Deleted");
        this.loadAirports();
      }else{
        alert("Delete failed");
      }
    })
  }
}

}
