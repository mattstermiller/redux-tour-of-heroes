import { createStandardAction, createAsyncAction, ActionType } from 'typesafe-actions'
import { Hero } from './model';

export module Actions {
  export const loadHeroes = createAsyncAction(
    'LOAD_HEROES_REQUEST',
    'LOAD_HEROES_SUCCESS',
    'LOAD_HEROES_FAIL',
  )<void, Hero[], string>();
  export const searchHeroes = createAsyncAction(
    'SEARCH_HEROES_REQUEST',
    'SEARCH_HEROES_SUCCESS',
    'SEARCH_HEROES_FAIL',
  )<string, Hero[], string>();
  export const addHero = createAsyncAction(
    'ADD_HERO_REQUEST',
    'ADD_HERO_SUCCESS',
    'ADD_HERO_FAIL'
  )<Hero, Hero, string>();
  export const updateHero = createStandardAction('UPDATE_HERO')<Hero>();
  export const deleteHero = createAsyncAction(
    'DELETE_HERO_REQUEST',
    'DELETE_HERO_SUCCESS',
    'DELETE_HERO_FAIL'
  )<Hero, Hero, string>();
  export const addMessage = createStandardAction('ADD_MESSAGE')<string>();
  export const clearMessages = createStandardAction('CLEAR_MESSAGES')();
}

export type HeroAction = ActionType<typeof Actions>;
