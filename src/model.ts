export interface Hero {
  id: number;
  name: string;
}

export interface State {
  heroes: Hero[],
  isLoadingHeroes: boolean,
  loadHeroesError: string | null,
  searchInput: string,
  searchResults: Hero[],
  messages: string[],
}

export const initialState : State = {
  heroes: [],
  isLoadingHeroes: false,
  loadHeroesError: null,
  searchInput: "",
  searchResults: [],
  messages: [],
}
