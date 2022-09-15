import { Component, OnInit } from '@angular/core';
import {
  IAllPokemons,
  IResultPokemon,
  PokeService,
} from 'src/app/services/poke.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public pokemonList: IAllPokemons;
  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    this.pokeService.getAllPokemons().subscribe((result) => {
      console.log(result);
      this.pokemonList = result;
    });
  }

  addToFavorites(pokemon: IResultPokemon) {
    pokemon.isFavorite = !pokemon.isFavorite;
  }
}
