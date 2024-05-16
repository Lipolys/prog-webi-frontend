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


  ngOnInit(): void {
    const id = this.activateRouted.snapshot.paramMap.get('id'); //pegar na rota atual o prametro especificado na rota
    console.log("ID edição:"+id+":");
    if (id) {
      this.bikeService.getById(parseInt(id)).subscribe(value => {
        const bikeAux = value;
        console.log("INIT FORM:" + JSON.stringify(bikeAux));
        if (bikeAux) {
          this.bike = bikeAux;
        }
      }, error => {
        console.log("Erro:", JSON.stringify(error));
        alert(`Erro ao buscar o dados:${error.error}`);
      })

    }
  }

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

}
