import {Component} from '@angular/core';
import {Bike} from '../../bike/bike';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {BikeService} from "../../bike/bike.service";
import {NgForOf, NgIf} from "@angular/common";



@Component({
  selector: 'bike-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf,
    NgForOf
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
  bikeType?: string;
  mountainBikeWheelSizes = [26, 27.5, 29];
  mountainBikeFrameSizes = [14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21];
  speedBikeWheelSizes = [29];
  speedBikeFrameSizes = [46, 48, 50, 52, 54, 56, 58, 59];

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService
  ) {
  }



  onSubmit() {
    this.bike.isMTB = this.bikeType === 'MTB';
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

  newBike(create: NgForm): void {
    this.submitted = false;
    this.bike = new Bike();
    create.resetForm();
  }

  protected readonly ActivatedRoute = ActivatedRoute;

}
