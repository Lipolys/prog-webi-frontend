import {Component} from '@angular/core';
import {Bike} from '../../bike/bike';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {BikeService} from "../../bike/bike.service";



@Component({
  selector: 'bike-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent {
  bike: Bike = new Bike();
  submitted: boolean = false;

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService
  ) {
  }

  onSubmit() {
    this.bikeService.save(this.bike)
      .subscribe(value => {
        console.log("Salvo:", JSON.stringify(value));
        //alert("Salvo com sucesso!");
      }, error => {
        console.log("Erro" + JSON.stringify(error));
        alert('Erro ao salvar:');
      });
    this.submitted = true;
  }

  newBike(): void {
    this.submitted = false;
    this.bike = new Bike();
  }

  protected readonly ActivatedRoute = ActivatedRoute;
}
