"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  taiwanCities: string[];
  areaData: { [key: string]: string[] };
  onSearch: (searchResults: string) => void;
}

const Search: React.FC<SearchProps> = ({
  taiwanCities,
  areaData,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const results = taiwanCities.filter((city) =>
      city.includes(searchQuery.trim())
    );
    onSearch(results);
  }, [searchQuery]);

  return (
    <div className="mb-5 w-full md:w-1/2">
      <div className="px-2 py-[0.35rem] bg-slate-100 border rounded-lg flex justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜尋站點"
          className="bg-transparent focus:outline-none"
        />
        <FaSearch />
      </div>
    </div>
  );
};

export default Search;
