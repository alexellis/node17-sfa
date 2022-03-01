import React from 'react';
import axios from 'axios';

export default class FunctionQuery extends React.Component {
  state = {
    functionRes: 'No result yet'
  }

  async componentDidMount() {
    let getURL = window.location.protocol
    +"//"+ window.location.host+`/function/myportal`
    console.log(getURL)

    await axios.post(getURL, 
      {"input":"test",
       "window.location.host": window.location.host, 
       "user-agent": navigator.userAgent
      })
    .then(res => {
      const result = JSON.stringify(res.data);
      this.setState({functionRes: result});
    })
  }

  render() {
    return (
      <div>
        {this.state.functionRes}
      </div>
    )
  }
}
