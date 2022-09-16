import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private pokeService: PokeService, private router: Router) {}

  ngOnInit(): void {
    this.pokeService.getAllPokemons().subscribe((result) => {
      console.log(result);
      this.pokemonList = result;
    });
  }

  addToFavorites(event: Event, pokemon: IResultPokemon) {
    event.stopPropagation();
    pokemon.isFavorite = !pokemon.isFavorite;
  }

  showPokemonDetails({ name }: IResultPokemon) {
    this.router.navigate(['pokemon-details'], { queryParams: { name } });
  }
}
