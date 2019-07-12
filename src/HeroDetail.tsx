import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './model';
import { Actions } from './actions';

import './Heroes.css';

function mapState({ editHero }: State) {
  return { editHero };
}

const mapDispatch = {
  changeName: Actions.changeName,
}

type Props = ReturnType<typeof mapState> & typeof mapDispatch

export function HeroDetail({ editHero, changeName }: Props) {
  if (editHero) {
    return (
      <div className="hero">
        <h2>{editHero.name.toUpperCase()} Details</h2>
        <div><span>id: </span>{editHero.id}</div>
        <div>
          <label>name:
            <input placeholder="name" value={editHero.name} onChange={e => changeName(e.target.value)}/>
          </label>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default connect(mapState, mapDispatch)(HeroDetail);
