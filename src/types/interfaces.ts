import type { ReactNode } from "react";

export interface Language {
  name: string;
}

export interface Continent {
  name: string;
}

export interface Country {
  code: string;
  name: string;
  capital: string;
  currency: string;
  languages: Language[];
  continent: Continent;
}

export interface CountriesData {
  countries: Country[];
}

// Error Boundary Component
export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
