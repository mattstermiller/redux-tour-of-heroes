import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from './model';
import HeroSearch from './HeroSearch';

import './Dashboard.css';

function mapState({ heroes }: State) {
  return { heroes: heroes.slice(1, 5) };
}

type Props = ReturnType<typeof mapState>

function Dashboard({ heroes }: Props) {
  return (
    <div className="Dashboard">
      <h3>Top Heroes</h3>
      <div className="grid grid-pad">
        {heroes.map(hero =>
          <Link key={hero.id} className="col-1-4" to={`/detail/${hero.id}`}>
            <div className="module hero">
              <h4>{hero.name}</h4>
            </div>
          </Link>
        )}
      </div>
      <HeroSearch/>
    </div>
  );
}

export default connect(mapState)(Dashboard);
