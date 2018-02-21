import React, { Component } from 'react';
import './app.less';


class App extends Component {
  componentDidMount() {
    document.title = 'Respondent.io';
  }

  render() {
    return (
      <div className='content'>
        {this.props.children}
      </div>
    );
  }
}

export default App;