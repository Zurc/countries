import React from "react";
import type { Country } from "../types/interfaces";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    // <div>
    //   <h2>{country.name}</h2>
    //   <p>Capital: {country.capital}</p>
    //   <p>Currency: {country.currency}</p>
    // </div>
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {country.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{country.continent.name}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {country.code}
        </span>
      </div>

      <dl className="mt-6 space-y-4">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Capital</dt>
          <dd className="text-sm text-gray-900">{country.capital || "N/A"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Currency</dt>
          <dd className="text-sm text-gray-900">{country.currency || "N/A"}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500 mb-2">Languages</dt>
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
  );
};

export default CountryCard;
