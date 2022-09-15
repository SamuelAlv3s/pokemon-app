import { Component, OnInit } from '@angular/core';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public pokemonList: any;
  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    this.pokeService.getAllPokemons().subscribe((result) => {
      console.log(result);
      this.pokemonList = result;
    });
  }
}
