import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import CountryListContainer from "./containers/CountryListContainer";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-900 antialiased p-4">
        <header className="text-center py-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-4">
            Countries of the World
          </h1>
          <p className="text-lg text-gray-600">
            Exploring countries using GraphQL
          </p>
        </header>
        <main>
          <CountryListContainer children={undefined} />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
