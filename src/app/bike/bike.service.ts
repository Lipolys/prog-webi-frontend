import { Injectable } from '@angular/core';
import {Bike} from "./bike";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private http!: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
  getById(id: number): Observable<Bike> {
    console.log("Inicio getAll");
    return this.http.get<Bike>(`http://localhost:8080/api/v1/bike/${id}`);
  }

  getAll(): Observable<Bike[]> {
    console.log("Inicio getAll");
    return this.http.get<Bike[]>("http://localhost:8080/api/v1/bike");
  }

  save(bike: Bike): Observable<Bike> {
    if (bike.id) {
      console.log("Alterar:" + JSON.stringify(bike))
      return this.http.put<Bike>(`http://localhost:8080/api/v1/bike/${bike.id}`, bike);
    } else {
      console.log("Incluir:" + JSON.stringify(bike))
      return this.http.post<Bike>("http://localhost:8080/api/v1/bike", bike);
    }
  }

  delete(id: number): Observable<Bike> {
    console.log("Alterar:" + id)
    return this.http.delete<Bike>(`http://localhost:8080/api/v1/bike/${id}`);
  }
}
