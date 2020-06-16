import React, { Component } from 'react';
import axios from 'axios';

const API_ROOT = '/api';

class App extends Component {
  state = {
    authors: [],
    books: [],
  };

  componentDidMount() {
    this.getAuthors();
    this.getBooks();
  }

  getAuthors = () => {
    axios
      .get(`${API_ROOT}/authors`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          authors: response.data,
        });
      })
      .catch((err) => console.log(err));
  };

  getBooks = () => {
    axios
      .get(`${API_ROOT}/books`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          books: response.data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <h1>React Library</h1>
        <section>
          <h2>Authors</h2>
          <ul>
            {this.state.authors.length
              ? this.state.authors.map((author) => (
                  <li key={author.id}>
                    <h3>{author.name}</h3>
                    <p>Author ID: {author.id}</p>
                  </li>
                ))
              : 'no authors found'}
          </ul>
        </section>
        <hr />
        <section>
          <h2>Books</h2>
          <ul>
            {this.state.books.length
              ? this.state.books.map((book) => (
                  <li key={book.id}>
                    <h3>{book.name}</h3>
                    <p>{book.description}</p>
                    <p>Author ID: {book.author_id}</p>
                  </li>
                ))
              : 'no books found'}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;
