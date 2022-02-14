import './App.css';
import Home from "./pages/Home";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router";

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://tmdb.sandbox.zoosh.ie/dev/graphql"
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
