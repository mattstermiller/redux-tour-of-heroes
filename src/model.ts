export interface Hero {
  id: number;
  name: string;
}

export interface State {
  heroes: Hero[],
  isLoadingHeroes: boolean,
  loadHeroesError: string | null,
  messages: string[],
}

export const initialState : State = {
  heroes: [],
  isLoadingHeroes: false,
  loadHeroesError: null,
  messages: [],
}
