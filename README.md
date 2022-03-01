# node17-sfa

Single Function App with ReactJs

Read the blog post here: [Hosting a React App with OpenFaaS](https://www.openfaas.com/blog/react-app/)

## Usage

```bash
# Change as required:
export OPENFAAS_PREFIX=docker.io/alexellis2

faas-cli template pull https://github.com/alexellis/node17-sfa
faas-cli new --lang node17-sfa myportal
```

Then, build and deploy the function:

```bash
faas-cli up -f myportal.yml
```

If you want to change the mounted path, edit: `myportal/react/package.json`

```
  "homepage": "/function/myportal",
```

The homepage field must match the function name or custom domain you're using to access the React app.

Edit your React app's source code, and redeploy it:

Edit `./react/public/index.html` or `./react/src/App.js`

Then run:

```bash
faas-cli up -f myportal.yml
faas-cli describe -f myportal.yml myportal
```

Finally, access the function through it's URL.

You can use `axios` to make requests to the function

```bash
cd react/
npm install --save axios
```

For example `FunctionQuery.js`:

```jsx
import React from 'react';
import axios from 'axios';

export default class FunctionQuery extends React.Component {
  state = {
    functionRes: 'No result yet'
  }

  async componentDidMount() {
    let getURL = window.location.protocol
    +"//"+ window.location.host+`/`
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
```

Then import the component into your React app in `App.js`:

```jsx
import logo from './logo.svg';
import './App.css';
import FunctionQuery from "./FunctionQuery.js"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <FunctionQuery />
      </header>
    </div>
  );
}

export default App;
```
