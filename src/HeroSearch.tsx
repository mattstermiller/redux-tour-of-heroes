import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from './model';
import { Actions, HeroAction } from './actions';

import './HeroSearch.css'

function mapState({ searchInput, searchResults }: State) {
  return { searchInput, searchResults };
}

function mapDispatch(dispatch: Dispatch<HeroAction>) {
  return bindActionCreators({
    searchHeroes: Actions.searchHeroesBegin,
  }, dispatch);
}

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

function HeroSearch({ searchInput, searchResults, searchHeroes }: Props) {
  return (
    <div id="search-component">
      <h4><label htmlFor="search-box">Hero Search</label></h4>
    
      <input id="search-box" value={searchInput} onChange={e => searchHeroes(e.target.value)} />
    
      <ul className="search-result">
        {searchResults.map(hero =>
          <li key={hero.id}>
            <Link to={`/detail/${hero.id}`}>
              {hero.name}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default connect(mapState, mapDispatch)(HeroSearch);