"use client";
import React from "react";

const SearchBar = ({ values = [], className = "", onClick = () => {} }) => {
  return (
    <div className={className}>
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Location
      </label>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={values?.[0]?.name ?? values?.[0]}
        onChange={(e) => onClick(e.target.value)}
      >
        {values.length &&
          values.map((value) => (
            <option key={value?.id ?? value} value={value?.name ?? value}>
              {value?.name ?? value}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SearchBar;
