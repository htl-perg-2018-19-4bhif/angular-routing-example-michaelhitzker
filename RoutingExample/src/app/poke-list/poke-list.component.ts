import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IListPokemon } from '../models/IListPokemon';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})



export class PokeListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'img', 'name'];
  pokemons: IListPokemon[] = [];
  dataSource: MatTableDataSource<IListPokemon>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=2000`).subscribe(pokemons => {
      this.modifyPokemonInfo(pokemons.results);
    });
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  modifyPokemonInfo(pokemons) {
    const modifiedPokemons: IListPokemon[] = [];
    for (const pokemon of pokemons) {
      const pokemonID = parseInt(this.getID(pokemon.url), 10);
      const modifiedPokemon: IListPokemon = {
        id: pokemonID,
        name: this.formatName(pokemon.name),
        url: `/${pokemonID}`
      };
      modifiedPokemons.push(modifiedPokemon);
    }
    this.pokemons = modifiedPokemons;
    this.dataSource = new MatTableDataSource(this.pokemons);
  }

  formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getID(url: string): string {
    const regex = /\/(\d+)\//gm;

    let m: RegExpExecArray;
    let id: string;
    m = regex.exec(url);
    while (m !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m.forEach((match, groupIndex) => {
        if (groupIndex === 1) {
          id = match;
        }
      });
      m = regex.exec(url);
    }

    return id;
  }

}
