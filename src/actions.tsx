export const NAME_CHANGE = 'NAME_CHANGE';
export type NAME_CHANGE = typeof NAME_CHANGE;

export interface NameChange {
    type: NAME_CHANGE;
    name: string
}

export type HeroAction = NameChange;

export function nameChange(name: string): NameChange {
    return { type: NAME_CHANGE, name };
}