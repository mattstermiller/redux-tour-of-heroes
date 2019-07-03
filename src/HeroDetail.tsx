import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './index';
import * as actions from './actions';
import Hero from './hero';

import './Heroes.css';

interface Props {
  editHero: Hero | null;
  onNameChange?: (name: string) => void;
}

export function HeroDetail({ editHero, onNameChange=(() => null) }: Props) {
  if (editHero) {
    return (
      <div className="hero">
        <h2>{editHero.name.toUpperCase()} Details</h2>
        <div><span>id: </span>{editHero.id}</div>
        <div>
          <label>name:
            <input placeholder="name" value={editHero.name} onChange={e => onNameChange(e.target.value)}/>
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
  onNameChange: actions.nameChange,
}

export default connect(mapState, mapDispatch)(HeroDetail);
