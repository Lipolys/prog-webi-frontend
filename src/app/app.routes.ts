import { Routes } from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {CreateComponent} from "./pages/create/create.component";
import {ListComponent} from "./pages/list/list.component";
import {UpdateComponent} from "./pages/update/update.component";
import {DeleteComponent} from "./pages/delete/delete.component";
import {ReadComponent} from "./pages/read/read.component";


export const routes: Routes = [
  {path:'list', component: ListComponent},
  {path:'about', component: AboutComponent},
  {path:'contact', component: ContactComponent},
  {path:'create', component: CreateComponent},
  {path:'update', component: UpdateComponent},
  {path:'delete', component: DeleteComponent},
  {path:'read', component: ReadComponent}
];
