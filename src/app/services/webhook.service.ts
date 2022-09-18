import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResultPokemon } from './poke.service';

@Injectable({
  providedIn: 'root',
})
export class WebhookService {
  constructor(private http: HttpClient) {}

  sendPokemonToFavorites(pokemon: IResultPokemon) {
    return this.http.post(
      'https://webhook.site/8a4f30ff-e242-4e91-89c5-1a7eb9d6ea60',
      pokemon
    );
  }
}
