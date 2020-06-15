import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(`/api`)
      .then((response) => {
        console.log(response);
        this.setState({
          data: response.data.routes,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.data.length) {
      return <p>No data to loop through</p>;
    }

    return (
      <div className="App">
        <h1>React FrontEnd</h1>
        {this.state.data.map((item) => (
          <>item</>
        ))}
      </div>
    );
  }
}

export default App;
