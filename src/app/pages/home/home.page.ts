import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IAllPokemons,
  IResultPokemon,
  PokeService,
} from 'src/app/services/poke.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public pokemonList: IAllPokemons;
  public paginate = {
    maxItensVisible: 5,
    totalPages: 0,
    currentPage: 1,
  };

  public paginateItens = [];
  constructor(private pokeService: PokeService, private router: Router) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(offset?: number) {
    this.pokeService.getAllPokemons(offset).subscribe((result) => {
      console.log(result);

      this.paginate.totalPages = Math.floor(
        result.count / this.pokeService.limit
      );
      this.pokemonList = result;
      this.calculatePaginateItens();
    });
  }

  addToFavorites(event: Event, pokemon: IResultPokemon) {
    event.stopPropagation();
    pokemon.isFavorite = !pokemon.isFavorite;
  }

  showPokemonDetails({ name }: IResultPokemon) {
    this.router.navigate(['pokemon-details'], { queryParams: { name } });
  }

  calculatePaginateItens() {
    this.paginateItens = [];
    let maxLeft =
      this.paginate.currentPage - Math.floor(this.paginate.maxItensVisible / 2);
    let maxRight =
      this.paginate.currentPage + Math.floor(this.paginate.maxItensVisible / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = this.paginate.maxItensVisible;
    }

    if (maxRight > this.paginate.totalPages) {
      maxLeft = this.paginate.totalPages - (this.paginate.maxItensVisible - 1);
      maxRight = this.paginate.totalPages;

      if (maxLeft < 1) {
        maxLeft = 1;
      }
    }

    for (let page = maxLeft; page <= maxRight; page++) {
      this.paginateItens.push(page);
    }
  }

  nextPage() {
    this.paginate.currentPage++;
    if (this.paginate.currentPage > this.paginate.totalPages) {
      this.paginate.currentPage = this.paginate.totalPages;
    }
    const offset = (this.paginate.currentPage - 1) * this.pokeService.limit;
    this.loadPokemons(offset);
  }

  previousPage() {
    this.paginate.currentPage--;
    if (this.paginate.currentPage < 1) {
      this.paginate.currentPage = 1;
    }
    const offset = (this.paginate.currentPage - 1) * this.pokeService.limit;
    this.loadPokemons(offset);
  }

  goToPage(index: number) {
    this.paginate.currentPage = index;
    const offset = (this.paginate.currentPage - 1) * this.pokeService.limit;
    this.loadPokemons(offset);
  }
}
