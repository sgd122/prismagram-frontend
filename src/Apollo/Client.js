import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://prismagram-prisma-a8ad1b9cee.herokuapp.com",
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
