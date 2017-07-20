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

  handleSubmit(value) {
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=${this.state.apiKey}&q=${value}&limit=18`, {
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
                this.handleSubmit(this.state.value);
              }}
            >
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
          { this.state.giphs.map(giph => <Giph key={giph.id} giph={giph} />)}
          </div>
      </section>
    );
  }
}

const Giph = (props) => {
  return (
    <div className="column is-2">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={props.giph.images.original.webp} alt="Image" />
          </figure>
          <a
            className="button is-small is-primary"
            onClick={() => {
              document.execCommand('copy');
            }}
          >
            Copy
          </a>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('main'));