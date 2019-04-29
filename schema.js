// This is the GraphQL-specific schema

const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql"); // Wrap dependency in {} to import multiple dependencies

// There will be two data types for this project LaunchType and RocketType
// The schema is based on what available information we want to pull from the API, specified in their docs

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Launch", // Name of this set of data
  // The fields properties are taken from the API docs, flight_number etc.
  // For each type in the fields value you must call the dependency above const
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    // here the type is not built-in but one we create (RocketType)
    // good example of graphqls ability to create relational references
    rocket: { type: RocketType }
  })
});

//  Rocket Type used above ast value ro Rocket

const RocketType = new GraphQLObjectType({
  name: "Rocket", // name of this set of data
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Root Query that creates endpoints with resolvers that gets the data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // get all the launches. BTW named the object name for what we're getting.
    launches: {
      // Uses the LaunchType schema to returns an array (list) of all the launches
      type: new GraphQLList(LaunchType),
      // argument doesn't need to be defined because your getting all launches
      // now a resolver function that takes two parent, args(LaunchType object) and returns the data from the API url
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches") // url and "launches" parameters form api docs
          .then(res => res.data);
      }
    },
    // get a specific launch. BTW named the object name for what we're getting.
    launch: {
      // Only one launch at a time is being requested so GraphQLList not needed
      type: LaunchType,
      //   define the argument (what you specifically want to pull out: flight_number)
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`) // url/launches param, and the args and it's flight_number property in template literal format
          .then(res => res.data);
      }
    },
    // ================== get all the rockets. BTW named the object name for what we're getting.==================
    // These won't be used in the actual front-end app. Just to show how to do it.
    rockets: {
      // Uses the RocketType schema to returns an array (list) of all the launches
      type: new GraphQLList(RocketType),
      // argument doesn't need to be defined because your getting all rockets
      // now a resolver function that takes two parent, args(LaunchType object) and returns the data from the API url
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets") // url and "rockets" parameters form api docs
          .then(res => res.data);
      }
    },
    // get a specific rocket. BTW named the object name for what we're getting.
    // I can't get this one to work.
    rocket: {
      // Only one rocket at a time is being requested so GraphQLList not needed
      type: RocketType,
      //   define the argument (what you specifically want to pull out: flight_number)
      args: {
        rocket_id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.rocket_id}`) // url/rockets param, and args(RocketType object) and it's rocket_id property in template literal format
          .then(res => res.data);
      }
    }
  }
});

// Export the schema which takes in an object (RootQuery in this case, but it could take more like for CRUD)
// GraphQLSchema is imported above
module.exports = new GraphQLSchema({
  query: RootQuery
});
