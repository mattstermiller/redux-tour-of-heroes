import Hero from './hero';

export const NAME_CHANGE = 'NAME_CHANGE';
export type NAME_CHANGE = typeof NAME_CHANGE;

export interface NameChange {
    type: NAME_CHANGE;
    name: string
}

export const HERO_SELECT = 'HERO_SELECT';
export type HERO_SELECT = typeof HERO_SELECT;

export interface HeroSelect {
    type: HERO_SELECT;
    hero: Hero
}

export type HeroAction = NameChange | HeroSelect;

export function nameChange(name: string): NameChange {
    return { type: NAME_CHANGE, name };
}

export function heroSelect(hero: Hero): HeroSelect {
    return { type: HERO_SELECT, hero };
}
