import { createStandardAction as stdAction, ActionType } from 'typesafe-actions'
import { Hero } from './model';

export module Actions {
    export const loadHeroesBegin = stdAction('LOAD_HEROES_BEGIN')();
    export const loadHeroesSuccess = stdAction('LOAD_HEROES_SUCCESS')<Hero[]>();
    export const loadHeroesError = stdAction('LOAD_HEROES_ERROR')<string>();
    export const searchHeroesBegin = stdAction('SEARCH_HEROES_BEGIN')<string>();
    export const searchHeroesSuccess = stdAction('SEARCH_HEROES_SUCCESS')<Hero[]>();
    export const addHeroBegin = stdAction('ADD_HERO_BEGIN')<Hero>();
    export const addHeroSuccess = stdAction('ADD_HERO_SUCCESS')<Hero>();
    export const updateHero = stdAction('UPDATE_HERO')<Hero>();
    export const deleteHeroBegin = stdAction('DELETE_HERO_BEGIN')<Hero>();
    export const deleteHeroSuccess = stdAction('DELETE_HERO_SUCCESS')<Hero>();
    export const addMessage = stdAction('ADD_MESSAGE')<string>();
    export const clearMessages = stdAction('CLEAR_MESSAGES')();
}

export type HeroAction = ActionType<typeof Actions>;
