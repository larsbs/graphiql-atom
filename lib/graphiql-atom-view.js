'use babel';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './routes/Root';


export default class GraphiqlAtomView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('graphiql-atom');

    const reactRoot = document.createElement('div'); 
    reactRoot.id = 'react-root-graphiql';
    this.element.appendChild(reactRoot);

    const modalsOutlet = document.createElement('div'); 
    modalsOutlet.id = 'modals-outlet';
    this.element.appendChild(modalsOutlet);

    setTimeout(() => {
      const Component = () => <div className="hellocomponent">Hello</div>;

      ReactDOM.render(
        <Root />,
        document.getElementById('react-root-graphiql'),
      );
    }, 1000);
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    // Used by Atom for tab text
    return 'GraphiQL';
  }


}
