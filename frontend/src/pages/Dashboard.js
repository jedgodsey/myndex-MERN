import React from 'react';
import MyndexModel from '../models/myndex'
import IndexCard from '../components/IndexCard';

class Dashboard extends React.Component {
  state = {
    indeces: []
  }

  componentDidMount() {
    MyndexModel.all().then(data => {
      this.setState({indeces: data.indeces})
    })
  }
  render() {
    return(
      <>
        <h1>Dashboard.js test four</h1>
        <p>get some</p>
        {this.state.indeces && this.state.indeces.map(item => <IndexCard index={item} />)}
      </>
    )
  }
}

export default Dashboard;
