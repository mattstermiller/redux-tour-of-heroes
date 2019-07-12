export interface Hero {
  id: number;
  name: string;
}

export interface State {
  heroes: Hero[],
  isLoadingHeroes: boolean,
  loadHeroesError: string | null,
  editHero: Hero | null,
}

export const initialState : State = {
  heroes: [],
  isLoadingHeroes: false,
  loadHeroesError: null,
  editHero: null,
}
