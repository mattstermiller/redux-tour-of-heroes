export interface Hero {
  id: number;
  name: string;
}

export interface State {
  heroes: Hero[],
  editHero: Hero | null,
}

export const initialState : State = {
  heroes: [],
  editHero: null,
}
