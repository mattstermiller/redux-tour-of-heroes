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
  updateHero: Actions.updateHero,
}

type Props = ReturnType<typeof mapState> & typeof mapDispatch;

export function HeroDetail({ editHero, updateHero }: Props) {
  const [editName, setEditName] = React.useState(editHero ? editHero.name : '');
  if (editHero) {
    return (
      <div className="HeroDetail">
        <h2>{editHero.name.toUpperCase()} Details</h2>
        <div><span>id: </span>{editHero.id}</div>
        <div>
          <label>name:
            <input placeholder="name"
                   value={editName} onChange={e => setEditName(e.target.value)}/>
          </label>
        </div>
        <button onClick={() => {
          history.back();
          updateHero({ ...editHero, name: editName});
          }}>save</button>
        <button onClick={() => history.back()}>cancel</button>
      </div>
    )
  } else {
    return null;
  }
}

export default connect(mapState, mapDispatch)(HeroDetail);
