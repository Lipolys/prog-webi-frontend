import {Component, ElementRef, ViewChild, OnInit, OnDestroy,} from '@angular/core';
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
import {MatNativeDateModule} from "@angular/material/core";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";



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
    MatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})  @ViewChild('content', { static: false })

export class ListComponent {
  bikes: Bike[] = [];
  bike: Bike = new Bike();
  constructor(
    public bikeService: BikeService,
    public content: ElementRef,
  public router: Router) {
  }

  ngOnInit(): void {
    this.bikes = [];
    this.bikeService.getAll().subscribe((value: Bike[]) => {
      this.bikes = value;
    });
  }

  deleteBike(id: number): void {
    this.router.navigate(['/delete', id]);
    this.ngOnInit();
  }

  updateBike(id: number): void {
    this.router.navigate(['/update', id]);
    this.ngOnInit();
  }

  public exportAsPdf(): void {
    let data = this.content.nativeElement;
    html2canvas(data).then(canvas => {
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('BikeList.pdf');
    });
  }
}
