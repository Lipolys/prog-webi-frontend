import {Component} from '@angular/core';
import {Bike} from '../../bike/bike';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {BikeService} from "../../bike/bike.service";



@Component({
  selector: 'app-update',
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
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})


export class UpdateComponent {
  bike: Bike = new Bike();
  submittedSearch: boolean = false;
  idToUpdate!: number;

  constructor(
    private bikeService: BikeService,
    private router: Router,
  ) { }

  onSubmitSearch() {
    this.bikeService.getById(this.idToUpdate).subscribe(value => {
      this.bike = value;
      this.submittedSearch = true;
    } , error => {
      console.log("Erro:", JSON.stringify(error));
      alert(`Erro ao buscar o dados:${error.error}`);
    });
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
