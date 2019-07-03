import Hero from './hero';

export const CHANGE_NAME = 'CHANGE_NAME';
export type CHANGE_NAME = typeof CHANGE_NAME;

export interface ChangeName {
    type: CHANGE_NAME;
    name: string
}

export const SELECT_HERO = 'SELECT_HERO';
export type SELECT_HERO = typeof SELECT_HERO;

export interface SelectHero {
    type: SELECT_HERO;
    hero: Hero
}

export type HeroAction = ChangeName | SelectHero;

export function changeName(name: string): ChangeName {
    return { type: CHANGE_NAME, name };
}

export function selectHero(hero: Hero): SelectHero {
    return { type: SELECT_HERO, hero };
}
