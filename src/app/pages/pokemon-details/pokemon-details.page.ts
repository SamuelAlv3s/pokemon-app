import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPokemonDetails } from 'src/app/interfaces/pokemon-details.interface';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {
  public pokemonName: string;
  public pokemonDetails: IPokemonDetails;
  public pokemonTypesBackground = {
    fire: '#f7d0d0',
    grass: '#d0f7dd',
    bug: '#b3e9c5',
    water: '#d6d0f7',
    normal: '#e9f7d0',
    poison: '#f7d0f5',
    psychic: '#f7d0e0',
    eletric: '#f1f7d0',
    ice: '#d1d0f7',
    fighting: '#f7d0d0',
    ghost: '#ecd0f7',
    steal: '#ede1f1',
    fairy: '#facee0',
    dragon: '#faaffa',
    rock: '#faf2af',
    flying: '#eebafd',
    ground: '#fdedba',
    dark: '#4d4d4d2a',
  };
  public imageLoaded = false;
  constructor(
    private pokeService: PokeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((result) => {
      this.pokemonName = result.get('name');
      this.pokeService
        .getPokemonDetails(this.pokemonName)
        .subscribe((pokemon) => {
          console.log(pokemon);

          this.pokemonDetails = pokemon as unknown as IPokemonDetails;
        });
    });
  }
}
