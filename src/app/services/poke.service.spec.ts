import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  pokemonDetailsResponse,
  pokemonDetailsResult,
} from '../mocks/pokemonDetails.mock';
import pokemonListMock from '../mocks/pokemonList.mock';

import { PokeService } from './poke.service';

describe('PokeService', () => {
  let service: PokeService;
  let httpController: HttpTestingController;

  const mockPokemonList = pokemonListMock;
  const mockPokemonDetailsResponse = pokemonDetailsResponse;
  const mockPokemonDetailsResult = pokemonDetailsResult;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeService],
    });
    service = TestBed.inject(PokeService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an list with 25 pokemons', () => {
    service.getAllPokemons().subscribe((response) => {
      expect(response).toEqual(mockPokemonList);
    });

    const httpRequest = httpController.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=25&offset=0'
    );

    expect(httpRequest.request.method).toEqual('GET');
    expect(httpRequest.request.responseType).toEqual('json');

    httpRequest.flush(mockPokemonList);
  });

  it('should return an pokemon url image', () => {
    const baseUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    const pokemonIndex = 2;
    const result = service.getPokemonImage(pokemonIndex);
    expect(result).toEqual(baseUrl + String(pokemonIndex) + '.png');
  });

  it('should return informations about one pokemon', () => {
    const mockPokemonName = 'charizard';
    service.getPokemonDetails(mockPokemonName).subscribe((response) => {
      expect(response).toEqual(mockPokemonDetailsResult);
    });

    const httpRequest = httpController.expectOne(
      'https://pokeapi.co/api/v2/pokemon/charizard'
    );

    expect(httpRequest.request.method).toEqual('GET');
    expect(httpRequest.request.responseType).toEqual('json');

    httpRequest.flush(mockPokemonDetailsResponse);
  });
});
