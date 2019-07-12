import { createStandardAction as stdAction, ActionType } from 'typesafe-actions'
import { Hero } from './model';

export module Actions {
    export const loadHeroes = stdAction('LOAD_HEROES')();
    export const changeName = stdAction('CHANGE_NAME')<string>();
    export const selectHero = stdAction('SELECT_HERO')<Hero>();
}

export type HeroAction = ActionType<typeof Actions>;
