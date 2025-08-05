import React, { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

// Define TypeScript interfaces
interface Country {
  code: string;
  name: string;
  capital: string;
  currency: string;
  languages: Language[];
  continent: Continent;
}

interface Language {
  name: string;
}

interface Continent {
  name: string;
}

interface CountriesData {
  countries: Country[];
}

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg font-semibold text-red-600">
            Something went wrong: {this.state.error?.message}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

// GraphQL query
const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      currency
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;

// Countries component
const Countries: React.FC = () => {
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-700">
          Loading Countries...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-red-600">
          Error: {error.message}
        </p>
      </div>
    );
  }

  // return (
  //   <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
  //     <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  //       {data?.countries.map((country) => (
  //         <li
  //           key={country.code}
  //           className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
  //         >
  //           <div className="p-6">
  //             <h3 className="text-xl font-bold text-gray-900 mb-2">
  //               {country.name}
  //             </h3>
  //             <div className="space-y-2">
  //               <p className="text-gray-700 text-sm">
  //                 <span className="font-semibold">Capital:</span>{" "}
  //                 {country.capital || "N/A"}
  //               </p>
  //               <p className="text-gray-700 text-sm">
  //                 <span className="font-semibold">Currency:</span>{" "}
  //                 {country.currency || "N/A"}
  //               </p>
  //               <p className="text-gray-700 text-sm">
  //                 <span className="font-semibold">Continent:</span>{" "}
  //                 {country.continent.name}
  //               </p>
  //               <p className="text-gray-700 text-sm">
  //                 <span className="font-semibold">Languages:</span>{" "}
  //                 {country.languages.map((lang) => lang.name).join(", ")}
  //               </p>
  //             </div>
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  //option 1
  // Update the country card rendering in the Countries component:
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.countries.map((country) => (
          <li
            key={country.code}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                {country.name}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">{country.capital || "N/A"}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Currency</p>
                  <p className="font-medium">{country.currency || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Continent</p>
                  <p className="font-medium">{country.continent.name}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {country.languages.map((lang) => (
                    <span
                      key={lang.name}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {lang.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <ErrorBoundary>
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
            <Countries />
          </main>
        </div>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export default App;
