import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import QuotesDisplay from './QuotesDisplay'

export default class App extends Reac.Component {
  constructor(props) {
    super(props);
    this.state = {
      signed_in: false
    };
  }

  componentWillMount() {
    axios.get(`/auth/signed_in.json`)
      .then(response => {
        this.setState({ order: response.data[0] })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
        <Router>
            <div>
                <Route
                    path='/'
                    startingQuoteId={props.startingQuoteId}
                    render={(routeProps) => <QuotesDisplay {...props} {...routeProps} />}
                />
            </div>
        </Router>
    )
  }
}
