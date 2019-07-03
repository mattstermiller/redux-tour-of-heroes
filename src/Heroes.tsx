import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './index';
import * as actions from './actions';
import Hero from './hero';
import HeroDetail from './HeroDetail'

import './Heroes.css';

interface Props {
  heroes: Hero[];
  editHero: Hero | null;
  selectHero?: (hero: Hero) => void;
}

export function Heroes({ heroes, editHero, selectHero=(() => null) }: Props) {
  return (
    <div>
      <h2>My Heroes</h2>
      <ul className="heroes">
        {heroes.map(hero =>
          <li
            key={hero.id}
            className={hero === editHero ? "selected" : ""}
            onClick={() => selectHero(hero)}
            >
            <span className="badge">{hero.id}</span> {hero.name}
          </li>
        )}
      </ul>
      <HeroDetail/>
    </div>
  );
}

function mapState({ heroes, editHero }: State) {
  return { heroes, editHero };
}

const mapDispatch = {
  selectHero: actions.selectHero,
}

export default connect(mapState, mapDispatch)(Heroes);
