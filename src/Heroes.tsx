import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { State } from './model';
import { Actions, HeroAction } from './actions';

import './Heroes.css';

function mapState({ heroes, isLoadingHeroes, loadHeroesError: loadError }: State) {
  return { heroes, isLoading: isLoadingHeroes, loadError: loadError };
}

function mapDispatch(dispatch: Dispatch<HeroAction>) {
  return bindActionCreators({
    loadHeroes: Actions.loadHeroes.request,
    addHero: Actions.addHero.request,
    deleteHero: Actions.deleteHero.request,
  }, dispatch);
}

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

export function Heroes({ heroes, isLoading, loadError, loadHeroes, addHero, deleteHero }: Props) {
  const [newName, setNewName] = React.useState('');
  return (
    <div>
      <h2>My Heroes</h2>
      {isLoading && 
        <div>Loading, please wait...</div>
      }
      {loadError &&
        <div>
          <div className="error">Error loading Heroes: {loadError}</div>
          <button onClick={() => loadHeroes()}>Try Again</button>
        </div>
      }
      <div>
        <label>Hero name:&nbsp;
          <input value={newName} onChange={e => setNewName(e.target.value)}/>
        </label>
        <button onClick={() => {
          setNewName('');
          addHero({ id: 0, name: newName });
          }}>add</button>
      </div>
      <ul className="heroes">
        {heroes.map(hero =>
          <li key={hero.id}>
            <Link to={`/detail/${hero.id}`}>
              <span className="badge">{hero.id}</span> {hero.name}
            </Link>
            <button className="delete" title="delete hero" onClick={() => deleteHero(hero)}>x</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default connect(mapState, mapDispatch)(Heroes);
