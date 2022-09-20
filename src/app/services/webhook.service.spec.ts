import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WebhookService } from './webhook.service';

describe('WebhookService', () => {
  let service: WebhookService;
  let httpController: HttpTestingController;

  const mockPokemon = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    isFavorite: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WebhookService],
    });
    service = TestBed.inject(WebhookService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send pokemon informations to webhook', () => {
    service.sendPokemonToFavorites(mockPokemon).subscribe();

    const httpRequest = httpController.expectOne(
      'https://webhook.site/8a4f30ff-e242-4e91-89c5-1a7eb9d6ea60'
    );

    expect(httpRequest.request.method).toEqual('POST');

    httpRequest.flush([]);
  });
});
