import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <div className="title">
            <h2>Modern React</h2> 
          <h1>
            Quote Machine
          </h1>
        </div>
        <QuoteContainer>
          <QuoteComponent />
        </QuoteContainer>
      </div>
    )
  }
}

class QuoteContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      quote: '',
      author: ''
    };
  }
  randomQuote() {
    fetch("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(response) {
        this.setState({ quote: response.quote, author: response.author });
      }.bind(this));
  }
  
  componentWillMount() {
    this.randomQuote();
  }
  render() {
    return (
      <div>
        <div className="buttons">
          <button onClick={() => this.randomQuote()}>Show me a random quote / Not working yet</button>
        </div>
        <QuoteComponent quote={this.state.quote} author={this.state.author} />
      </div>
    )
  }
}

class QuoteComponent extends React.Component {
  createQuoteAuthor() {
    if (this.props.author.length === 0) {
      return this.props.quote;
    }
    else {
      return "— " + this.props.author;
    }
  }
  render() {
    return (
      <div className="quotes">
        <p className="quoteText">"{this.props.quote}"</p>
        <p className="quoteAuthor">{this.createQuoteAuthor()}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// registerServiceWorker();
