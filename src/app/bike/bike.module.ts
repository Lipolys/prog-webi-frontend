import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CreateComponent} from "../pages/create/create.component";
import {ListComponent} from "../pages/list/list.component";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    CreateComponent,
    ListComponent,
  ]
})
export class TasksModule { }
