import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { Bike } from "../../bike/bike";
import {BikeService} from "../../bike/bike.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  bikes: Bike[] = [];
  bike: Bike = new Bike();
  submittedUpdate = false;
  idAux!: number;

  constructor(public bikeService: BikeService,
  public router: Router) {

  }

  ngOnInit(): void {
    this.bikes = [];
    this.bikeService.getAll().subscribe((value: Bike[]) => {
      this.bikes = value;
    });
  }

  updateBike(bike: Bike): void {
    this.submittedUpdate = true;
    this.idAux = bike.id;
    this.bike = bike;
    }

  deleteBike(id: number): void {
    if (confirm("Deseja realmente deletar esta bicicleta?")) {
      this.bikeService.delete(id).subscribe(value => {
        alert("Bicicleta deletada com sucesso!");
        this.router.navigate(['']);
      }, error => {
        console.log("Erro:", JSON.stringify(error));
        alert(`Erro ao deletar o dados:${error.error}`);
      });
    }
  }

  onSubmit() {
    this.bikeService.save(this.bike)
      .subscribe(value => {
        console.log("Salvo:", JSON.stringify(value));
        this.router.navigate(['']);
        //alert("Salvo com sucesso!");
      }, error => {
        console.log("Erro" + JSON.stringify(error));
        alert('Erro ao salvar:');
      });
  }

}
