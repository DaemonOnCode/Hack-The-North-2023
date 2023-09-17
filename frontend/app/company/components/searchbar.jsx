"use client";
import React from "react";

const SearchBar = ({
  values = [],
  className = "",
  onClick = () => {},
  searchbarTitle = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {searchbarTitle}
      </label>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={values?.[0]?.id ?? values?.[0]}
        onChange={onClick}
      >
        {values.length &&
          values.map((value) => (
            <option key={value?.id ?? value} value={value?.id ?? value}>
              {value?.display_prompt ?? value}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SearchBar;
