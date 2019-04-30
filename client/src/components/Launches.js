// with ES7 React/Redux/GraphQL/React-Native snippets installed in VS code type RCE automatically get a class based component
import React, { Component } from 'react' //** */
import gql from "graphql-tag"; // used to make the queries **
import { Query } from "react-apollo"; // query component **

// Creat the query by defining the data you want from launches **
// Note the back ticks syntax
const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;
// ** 
export class Launches extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4 my-3">Launches</h1>
      </div>
    )
  }
}

export default Launches
