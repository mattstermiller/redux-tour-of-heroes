import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './model';
import { Actions } from './actions';
import HeroDetail from './HeroDetail'

import './Heroes.css';

function mapState({ heroes, editHero }: State) {
  return { heroes, editHero };
}

const mapDispatch = {
  selectHero: Actions.selectHero,
}

type Props = ReturnType<typeof mapState> & typeof mapDispatch

export function Heroes({ heroes, editHero, selectHero }: Props) {
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

export default connect(mapState, mapDispatch)(Heroes);
