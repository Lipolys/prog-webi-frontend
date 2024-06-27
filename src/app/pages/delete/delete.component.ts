import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BikeService} from "../../bike/bike.service";
import {Bike} from "../../bike/bike";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  bike: Bike = new Bike();
  idToDelete!: number;
  submittedConfirm: boolean = false;

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService
  ) {
    this.activateRouted.params.subscribe(params => {
      this.idToDelete = params['id'];
      this.onSubmitDelete();
    });
  }

  onSubmitDelete() {
    if (confirm("Deseja realmente deletar esta bicicleta?")) {
        this.bikeService.delete(this.idToDelete).subscribe(value => {
        this.submittedConfirm = true;
        alert("Bicicleta deletada com sucesso!");
        this.router.navigate(['']);
      }, error => {
        console.log("Erro:", JSON.stringify(error));
        alert(`Erro ao deletar o dados:${error.error}`);
      });
    } else {
      this.router.navigate(['']);
    }
  }
}
