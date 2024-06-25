import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  creators = [
    {
      name: 'Marcos Antônio Barbosa de Souza',
      email: 'desouza.marcos@outlook.com.br',
      phone: '+55 (62) 99208-9474',
    },
    {
      name: 'Luiz Felipe de Almeida e Silva',
      email: 'luizfelipedn57@gmail.com',
      phone: '+55 (62) 99688-5739',
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
