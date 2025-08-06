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

  // Design Option 1: Card Grid with Flag Headers
  // Update the country card rendering in the Countries component:
  // return (
  //   <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
  //     <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  //       {data?.countries.map((country) => (
  //         <li
  //           key={country.code}
  //           className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
  //         >
  //           <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
  //             <div className="absolute inset-0 bg-black/20"></div>
  //             <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
  //               {country.name}
  //             </h3>
  //           </div>
  //           <div className="p-6 space-y-4">
  //             <div className="flex items-center space-x-2 text-gray-600">
  //               <svg
  //                 className="w-5 h-5"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth={2}
  //                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
  //                 />
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth={2}
  //                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  //                 />
  //               </svg>
  //               <span className="font-medium">{country.capital || "N/A"}</span>
  //             </div>
  //             <div className="grid grid-cols-2 gap-4 py-4 border-t">
  //               <div>
  //                 <p className="text-sm text-gray-500">Currency</p>
  //                 <p className="font-medium">{country.currency || "N/A"}</p>
  //               </div>
  //               <div>
  //                 <p className="text-sm text-gray-500">Continent</p>
  //                 <p className="font-medium">{country.continent.name}</p>
  //               </div>
  //             </div>
  //             <div className="border-t pt-4">
  //               <p className="text-sm text-gray-500 mb-2">Languages</p>
  //               <div className="flex flex-wrap gap-2">
  //                 {country.languages.map((lang) => (
  //                   <span
  //                     key={lang.name}
  //                     className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
  //                   >
  //                     {lang.name}
  //                   </span>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  // Design Option 2: Interactive List View
  // return (
  //   <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
  //     <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
  //       <div className="grid divide-y divide-gray-200">
  //         {data?.countries.map((country) => (
  //           <div
  //             key={country.code}
  //             className="group hover:bg-gray-50 transition-colors duration-200"
  //           >
  //             <div className="p-6 sm:px-8">
  //               <div className="flex items-center justify-between">
  //                 <div className="flex-1">
  //                   <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
  //                     {country.name}
  //                   </h3>
  //                   <p className="mt-1 text-sm text-gray-500">
  //                     {country.capital
  //                       ? `Capital: ${country.capital}`
  //                       : "No capital"}
  //                   </p>
  //                 </div>
  //                 <div className="ml-8 flex items-center space-x-4">
  //                   <div className="text-right">
  //                     <p className="text-sm font-medium text-gray-900">
  //                       {country.continent.name}
  //                     </p>
  //                     <p className="text-sm text-gray-500">
  //                       {country.currency || "No currency"}
  //                     </p>
  //                   </div>
  //                   <svg
  //                     className="w-5 h-5 text-gray-400 group-hover:text-blue-500"
  //                     fill="none"
  //                     stroke="currentColor"
  //                     viewBox="0 0 24 24"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth={2}
  //                       d="M9 5l7 7-7 7"
  //                     />
  //                   </svg>
  //                 </div>
  //               </div>
  //               <div className="mt-4 flex flex-wrap gap-2">
  //                 {country.languages.map((lang) => (
  //                   <span
  //                     key={lang.name}
  //                     className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
  //                   >
  //                     {lang.name}
  //                   </span>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  // Design Option 3: Detailed Table View
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.countries.map((country) => (
          <div
            key={country.code}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {country.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {country.continent.name}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {country.code}
                </span>
              </div>

              <dl className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Capital</dt>
                  <dd className="text-sm text-gray-900">
                    {country.capital || "N/A"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Currency
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {country.currency || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-2">
                    Languages
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {country.languages.map((lang) => (
                      <span
                        key={lang.name}
                        className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md"
                      >
                        {lang.name}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
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
