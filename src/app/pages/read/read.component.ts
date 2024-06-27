import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Bike} from "../../bike/bike";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BikeService} from "../../bike/bike.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss'
}) @ViewChild('readContent', { static: false })
export class ReadComponent {
  bike: Bike = new Bike();
  idToSearch!: number;
  submittedSearch: boolean = false;


  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService,
  public readContent: ElementRef
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

  deleteBike(id: number): void {
    this.router.navigate(['/delete', id]);
  }

  updateBike(id: number): void {
    this.router.navigate(['/update', id]);
  }

  public exportAsPdf(): void {
    let data = this.readContent.nativeElement;
    html2canvas(data).then(canvas => {
      let imgWidth = 190;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Calculate the x position to center the image
      let xPosition = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;

      pdf.addImage(contentDataURL, 'PNG', xPosition, position, imgWidth, imgHeight)
      pdf.save('Bike_' + this.bike.id + '.pdf'); // Generated PDF
    });
  }
}
