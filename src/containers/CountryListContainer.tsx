import React from "react";
import { useQuery, gql } from "@apollo/client";

import LoadingIndicator from "../components/LoadingIndicator";
import ErrorBoundary from "../components/ErrorBoundary";
import CountryList from "../presenters/CountryList";
import type { CountriesData } from "../types/interfaces";

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

interface CountryListContainerProps {
  children: React.ReactNode;
}

const CountryListContainer: React.FC<CountryListContainerProps> = () => {
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorBoundary children={error.message} />;
  if (!data) return <div>No data available</div>;

  return <CountryList countries={data.countries} />;
};

export default CountryListContainer;
