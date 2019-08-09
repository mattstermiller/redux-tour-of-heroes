import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from './model';
import { Actions } from './actions';

import './HeroDetail.css';

type MatchParams = { id: string }

function mapState({ heroes }: State, { match }: RouteComponentProps<MatchParams>) {
  let id = parseInt(match.params.id);
  return { editHero: heroes.find(h => h.id === id) };
}

const mapDispatch = {
  changeName: Actions.changeName,
}

type Props = ReturnType<typeof mapState> & typeof mapDispatch

export function HeroDetail({ editHero, changeName }: Props) {
  if (editHero) {
    return (
      <div className="HeroDetail">
        <h2>{editHero.name.toUpperCase()} Details</h2>
        <div><span>id: </span>{editHero.id}</div>
        <div>
          <label>name:
            <input placeholder="name"
                   value={editHero.name}
                   onChange={e => changeName({ id: editHero.id, newName: e.target.value})}/>
          </label>
        </div>
        <button onClick={() => history.back()}>go back</button>
      </div>
    )
  } else {
    return null;
  }
}

export default connect(mapState, mapDispatch)(HeroDetail);
