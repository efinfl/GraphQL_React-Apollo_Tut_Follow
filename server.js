const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema.js");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true //disable in production
  })
);

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server started on ${PORT}`));
