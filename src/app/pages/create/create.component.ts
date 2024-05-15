import {Component} from '@angular/core';
import {Bike} from '../../bike/bike';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';



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

  onSubmit() { this.submitted = true; }

  newBike() {
    this.bike = new Bike()
  }

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router
  ) {
  }


}
