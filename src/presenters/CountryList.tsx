import React from "react";
import CountryCard from "../components/CountryCard";
import type { Country } from "../types/interfaces";

interface CountryListProps {
  countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {countries.map((country) => (
          <div
            key={country.code}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <CountryCard country={country} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
