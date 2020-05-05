import "@babel/polyfill/noConflict";
import server from "./server";

// Default port is 4000
server.start({ port: process.env.PORT || 4000 }, () => {
  console.log("We are go for GraphQL!");
});
