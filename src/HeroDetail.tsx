import * as React from 'react';
import { connect } from 'react-redux';
import { Hero, State } from './model';
import * as actions from './actions';

import './Heroes.css';

interface Props {
  editHero: Hero | null;
  changeName?: (name: string) => void;
}

export function HeroDetail({ editHero, changeName=(() => null) }: Props) {
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

function mapState({ editHero }: State) {
  return { editHero };
}

const mapDispatch = {
  changeName: actions.changeName,
}

export default connect(mapState, mapDispatch)(HeroDetail);
