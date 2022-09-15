import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private baseUrlPokemonImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) {}

  getAllPokemons() {
    return this.http.get(this.baseUrl).pipe(
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
}
