import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IDetailPokemon } from '../models/IDetailPokemon';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.css']
})
export class PokeDetailsComponent implements OnInit {

  pokemonID: number;
  pokemon: IDetailPokemon = {
    name: '',
    imgUrl: '',
    abilities: []
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    route.paramMap.subscribe(map => {
      this.pokemonID = parseInt(map.get('id'), 10);
      this.loadPokemonInfo();
    });
  }

  ngOnInit() {

  }

  loadPokemonInfo() {
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${this.pokemonID}`).subscribe(pokemon => {
      this.setPokemonInfo(pokemon);
    });
  }

  setPokemonInfo(rawPokemon) {
    this.pokemon = {
      name: this.firstLetterUppercase(rawPokemon.name),
      imgUrl: rawPokemon.sprites.front_default,
      abilities: this.extractAbilityNames(rawPokemon.abilities),
    };
  }

  extractAbilityNames(abilities): string[] {
    const abilityStrings: string[] = [];
    for (const abilityObj of abilities) {
      console.log(abilityObj.ability.name);
      abilityStrings.push(this.firstLetterUppercase(abilityObj.ability.name));
    }
    console.log(abilityStrings);
    return abilityStrings;
  }

  firstLetterUppercase(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

}
