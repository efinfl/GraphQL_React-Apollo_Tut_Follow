import React, {Component} from "react";
import ApolloClient from "apollo-boost"; // the client
import { ApolloProvider } from "react-apollo"; // the provider
import "./App.css";
import logo from "./assets/images/logo.png";
import Launches from "./components/Launches"

// With Apollo you wrap the component in a provider and pass in a client
const client = new ApolloClient({
  uri: "http://localhose:5000/graphql" //path to the endpoint created using graphql in server.js
});

class App extends Component {
  render() {
    return (
      // Wrap everything in <Apollo Provider> and pass in the client created above
      <ApolloProvider client={client}>
      <div className="container">
        <img
          src={logo}
          alt="SpaceX"
          style={{ width: 300, display: "block", margin: "auto" }}
        />
      </div>
      <Launches />
      </ApolloProvider>
    );
  }
}

export default App;
