import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './index';
import * as actions from './actions';
import './Heroes.css';

export interface Props {
  id: number;
  name: string;
  nameChange?: (name: string) => void;
}

export function Heroes({ id, name, nameChange=(() => null) }: Props) {
  return (
    <div className="hero">
      <h2>{name.toUpperCase()} Details</h2>
      <div><span>id: </span>{id}</div>
      <div>
        <label>name:
          <input placeholder="name" value={name} onChange={(e) => nameChange(e.target.value)}/>
        </label>
      </div>
    </div>
  );
}

function mapState({ hero }: State) {
  return hero;
}

export default connect(mapState, actions)(Heroes);
