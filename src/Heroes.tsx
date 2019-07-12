import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { State } from './model';
import { Actions, HeroAction } from './actions';
import HeroDetail from './HeroDetail'
import { getHeroes } from './HeroService';

import './Heroes.css';

function mapState({ heroes, editHero, isLoadingHeroes, loadHeroesError: loadError }: State) {
  return { heroes, editHero, isLoading: isLoadingHeroes, loadError: loadError };
}

function mapDispatch(dispatch: Dispatch<HeroAction>) {
  return bindActionCreators({
    selectHero: Actions.selectHero,
    loadHeroes: getHeroes,
  }, dispatch);
}

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

export function Heroes({ heroes, editHero, isLoading, loadError, selectHero, loadHeroes }: Props) {
  return (
    <div>
      <h2>My Heroes</h2>
      {isLoading && 
        <div>Loading, please wait...</div>
      }
      {loadError &&
        <div>
          <div className="error">Error loading Heroes: {loadError}</div>
          <button onClick={loadHeroes}>Try Again</button>
        </div>
      }
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
