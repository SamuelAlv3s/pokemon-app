import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import pokemonListMock from 'src/app/mocks/pokemonList.mock';
import { PokeService } from 'src/app/services/poke.service';

import { HomePage } from './home.page';

fdescribe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const mockPokeService = jasmine.createSpyObj(['getAllPokemons', 'limit']);
  const mockPokemonsResult = pokemonListMock;
  const mockPokemon = {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    isFavorite: false,
  };

  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: PokeService, useValue: mockPokeService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    mockPokeService.getAllPokemons.and.returnValue(of(mockPokemonsResult));
    mockPokeService.limit.and.returnValue(25);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should loadPokemons', () => {
    spyOn(component, 'calculatePaginateItens');
    component.loadPokemons();

    expect(component.pokemonList).toEqual(mockPokemonsResult);
    expect(component.paginate.totalPages).toEqual(
      mockPokemonsResult.count / mockPokeService.limit
    );
    expect(component.calculatePaginateItens).toHaveBeenCalled();
  });

  it('should send pokemon to webhook and change propertie isFavorite', () => {
    spyOn(component, 'animateButtonFavorite');
    const event = new Event('PointerEvent');
    spyOn(event, 'stopPropagation');
    component.addToFavorites(event, mockPokemon);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(mockPokemon.isFavorite).toBeTrue();
    expect(component.animateButtonFavorite).toHaveBeenCalled();
  });

  it('should navigate to page pokemon-details', () => {
    component.showPokemonDetails(mockPokemon);

    expect(router.navigate).toHaveBeenCalledWith(['pokemon-details'], {
      queryParams: { name: mockPokemon.name },
    });
  });
});
