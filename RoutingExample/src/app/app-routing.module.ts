import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeDetailsComponent } from './poke-details/poke-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pokemons' },
  { path: 'pokemons', component: PokeListComponent },
  { path: 'pokemons/:id', component: PokeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
