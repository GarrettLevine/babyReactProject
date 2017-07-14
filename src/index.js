import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section>
        <div className="hero is-primary topNav">
          <nav className="nav">
            <div className="nav-left nav-item">
              <h1 className="title is-3">Get Me Giphs</h1>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));