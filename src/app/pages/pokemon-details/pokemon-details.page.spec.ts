import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { from, of } from 'rxjs';
import { pokemonDetailsResult } from 'src/app/mocks/pokemonDetails.mock';

import { PokemonDetailsPage } from './pokemon-details.page';

fdescribe('PokemonDetailsPage', () => {
  let component: PokemonDetailsPage;
  let fixture: ComponentFixture<PokemonDetailsPage>;

  const mockPokemonDetails = pokemonDetailsResult;
  const mockPokeService = jasmine.createSpyObj(['getPokemonDetails']);
  const mockPokemonName = 'charizard';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetailsPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsPage);
    component = fixture.componentInstance;

    mockPokeService.getPokemonDetails.and.returnValue(of(mockPokemonDetails));

    fixture.detectChanges();
    component.pokemonName = mockPokemonName;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a pokemon name and return details', () => {
    mockPokeService
      .getPokemonDetails(component.pokemonName)
      .subscribe((result) => {
        component.pokemonDetails = result;
      });

    expect(component.pokemonName).toEqual(mockPokemonName);
    expect(component.pokemonDetails).toEqual(mockPokemonDetails);
  });
});
