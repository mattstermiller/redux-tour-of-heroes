import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { State } from './model';
import { Actions, HeroAction } from './actions';

import "./Messages.css"

function mapState({ messages }: State) {
  return { messages };
}

function mapDispatch(dispatch: Dispatch<HeroAction>) {
  return bindActionCreators({
    clearMessages: Actions.clearMessages,
  }, dispatch);
}

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

export function Messages({ messages, clearMessages }: Props) {
  if (messages.length) {
    return (
      <div className="Messages">
        <h2>Messages</h2>
        <button className="clear"
                onClick={clearMessages}>Clear</button>
        {messages.map((msg, i) =>
          <div key={`message${i}`}>{msg}</div>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default connect(mapState, mapDispatch)(Messages);
