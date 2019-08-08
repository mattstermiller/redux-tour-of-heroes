export interface Hero {
  id: number;
  name: string;
}

export interface State {
  heroes: Hero[],
  isLoadingHeroes: boolean,
  editHero: Hero | null,
}

export const initialState : State = {
  heroes: [],
  isLoadingHeroes: false,
  editHero: null,
}
