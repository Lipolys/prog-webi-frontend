import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Bike} from "../../bike/bike";
import {ActivatedRoute, Router} from "@angular/router";
import {BikeService} from "../../bike/bike.service";

@Component({
  selector: 'app-read',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss'
})
export class ReadComponent {
  bike: Bike = new Bike();
  idToSearch!: number;
  submittedSearch: boolean = false;


  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService
  ) {
  }

  onSubmitSearch() {
    this.bikeService.getById(this.idToSearch).subscribe(value => {
      this.bike = value;
      this.submittedSearch = true;
    } , error => {
      console.log("Erro:", JSON.stringify(error));
      alert(`Erro ao buscar o dados:${error.error}`);
    });
  }
}
