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
