import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from './index';
import * as actions from './actions';
import Hero from './hero';

import './Heroes.css';

export interface Props {
  heroes: Hero[];
  editHero: Hero | null;
  onNameChange?: (name: string) => void;
  onHeroSelect?: (hero: Hero) => void;
}

export function Heroes({ heroes, editHero, onNameChange=(() => null), onHeroSelect=(() => null) }: Props) {
  return (
    <div>
      <h2>My Heroes</h2>
      <ul className="heroes">
        {heroes.map(hero =>
          <li
            key={hero.id}
            className={hero === editHero ? "selected" : ""}
            onClick={() => onHeroSelect(hero)}
            >
            <span className="badge">{hero.id}</span> {hero.name}
          </li>
        )}
      </ul>
      {editHero &&
        <div className="hero">
          <h2>{editHero.name.toUpperCase()} Details</h2>
          <div><span>id: </span>{editHero.id}</div>
          <div>
            <label>name:
              <input placeholder="name" value={editHero.name} onChange={e => onNameChange(e.target.value)}/>
            </label>
          </div>
        </div>
      }
    </div>
  );
}

function mapState({ heroes, editHero }: State) {
  return { heroes, editHero };
}

function mapDispatch(dispatch: Dispatch<actions.HeroAction>) {
  return {
    onNameChange: (name: string) => dispatch(actions.nameChange(name)),
    onHeroSelect: (hero: Hero) => dispatch(actions.heroSelect(hero)),
  };
}

export default connect(mapState, mapDispatch)(Heroes);
