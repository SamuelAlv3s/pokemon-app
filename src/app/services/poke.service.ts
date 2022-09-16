import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IResponsePokemonDetails } from '../interfaces/pokemon-details.interface';

export interface IAllPokemons {
  count: number;
  next: string;
  previous: any;
  results: IResultPokemon[];
}

export interface IBaseResultPokemon {
  name: string;
  url: string;
}

export interface IResultPokemon extends IBaseResultPokemon {
  image: string;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private baseUrlPokemonImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) {}

  getAllPokemons() {
    return this.http.get<IAllPokemons>(this.baseUrl).pipe(
      map((result) => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        const resultsWithImages = result['results'].map((item, index) => ({
          ...item,
          image: this.getPokemonImage(index + 1),
        }));

        return { ...result, results: resultsWithImages };
      })
    );
  }

  getPokemonImage(pokemonIndex: number) {
    return `${this.baseUrlPokemonImage}${pokemonIndex}.png`;
  }

  getPokemonDetails(name: string) {
    return this.http
      .get<IResponsePokemonDetails>(`${this.baseUrl}${name}`)
      .pipe(
        map((result) => {
          const pokemonDetails = {
            image: result.sprites.other.dream_world.front_default,
            stats: result.stats.map((item) => ({
              name: item.stat.name,
              value: item.base_stat,
            })),
            types: result.types.map((item) => item.type.name),
          };

          return pokemonDetails;
        })
      );
  }
}
