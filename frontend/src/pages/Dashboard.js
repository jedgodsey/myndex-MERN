import React from 'react';
import MyndexModel from '../models/myndex'

class Dashboard extends React.Component {
  state = {
    indeces: []
  }

  componentDidMount() {
    MyndexModel.all().then(data => {
      // this.setState({indeces: data})
    })
  }
  render() {
    return(
      <>
        <h1>Dashboard.js</h1>
        {this.state.indeces}
        
      </>
    )
  }
}

export default Dashboard;
