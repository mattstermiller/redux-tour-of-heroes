import Hero from './hero';

export const LOAD_HEROES = 'LOAD_HEROES';
export type LOAD_HEROES = typeof LOAD_HEROES;
export interface LoadHeroes {
    type: LOAD_HEROES;
}
export function loadHeroes(): LoadHeroes {
    return { type: LOAD_HEROES };
}

export const CHANGE_NAME = 'CHANGE_NAME';
export type CHANGE_NAME = typeof CHANGE_NAME;
export interface ChangeName {
    type: CHANGE_NAME;
    name: string
}
export function changeName(name: string): ChangeName {
    return { type: CHANGE_NAME, name };
}

export const SELECT_HERO = 'SELECT_HERO';
export type SELECT_HERO = typeof SELECT_HERO;
export interface SelectHero {
    type: SELECT_HERO;
    hero: Hero
}
export function selectHero(hero: Hero): SelectHero {
    return { type: SELECT_HERO, hero };
}

export type HeroAction = LoadHeroes | ChangeName | SelectHero;
