import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from './index';
import * as actions from './actions';
import './Heroes.css';

export interface Props {
  id: number;
  name: string;
  onNameChange?: (name: string) => void;
}

export function Heroes({ id, name, onNameChange=(() => null) }: Props) {
  return (
    <div className="hero">
      <h2>{name.toUpperCase()} Details</h2>
      <div><span>id: </span>{id}</div>
      <div>
        <label>name:
          <input placeholder="name" value={name} onChange={(e) => onNameChange(e.target.value)}/>
        </label>
      </div>
    </div>
  );
}

function mapState({ hero }: State) {
  return hero;
}

function mapDispatch(dispatch: Dispatch<actions.HeroAction>) {
  return {
    onNameChange: (name: string) => dispatch(actions.nameChange(name)),
  };
}

export default connect(mapState, mapDispatch)(Heroes);
