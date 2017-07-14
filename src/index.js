import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      apiKey: 'dc6zaTOxFJmzC',
      giphs: [],
      value: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`http://api.giphy.com/v1/gifs/search?api_key=${this.state.apiKey}&q=${this.state.value}&limit=18`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/jsonp',
      },
    })
    .then(res => res.json())
    .then(giphs => {
      this.setState({
        giphs: giphs.data,
      });
    });
  }

  render() {
    return (
      <section>
        <div style={{ marginBottom: "16px" }} className="hero is-primary topNav">
          <nav className="nav">
            <div className="nav-left nav-item">
              <h1 className="title is-3">Gimme Giphs 💃</h1>
            </div>
          </nav>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <p className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    placeholder="Primary input"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({
                        value: event.target.value,
                      });
                    }}
                  />
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="columns is-multiline">
          { this.state.giphs.map(giph => {
              return (
                <div key={giph.id} className="column is-2">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={giph.images.original.webp} alt="Image" />
                      </figure>
                      <a
                        className="button is-small is-primary"
                        onClick={() => {
                          document.execCommand('Copy', false, giph.images.original.url);
                        }}
                      >
                        Copy
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));