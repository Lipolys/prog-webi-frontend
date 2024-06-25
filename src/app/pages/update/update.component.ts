import {Component} from '@angular/core';
import {Bike} from '../../bike/bike';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {BikeService} from "../../bike/bike.service";
import {NgForOf, NgIf} from "@angular/common";



@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgForOf,
    NgIf
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})


export class UpdateComponent {
  bike: Bike = new Bike();
  idToUpdate!: number;
  bikeType: string = this.bike.isMTB ? 'MTB' : 'SPD';
  mountainBikeWheelSizes = [26, 27.5, 29];
  mountainBikeFrameSizes = [14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21];
  speedBikeWheelSizes = [29, 27.5, 700];
  speedBikeFrameSizes = [46, 48, 50, 52, 54, 56, 58, 59];

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService
  ) {
    this.activateRouted.params.subscribe(params => {
      this.idToUpdate = params['id'];
    })
    this.bikeService.getById(this.idToUpdate).subscribe(value => {
      this.bike = value;
    })
  }

  onSubmitUpdate() {
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
