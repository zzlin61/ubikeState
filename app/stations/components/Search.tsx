import React, { useState, useEffect } from "react";

interface SearchProps {
  areaData: { [key: string]: string[] };
  onSelectCity: (city: string) => void;
}

const Search: React.FC<SearchProps> = ({ areaData, onSelectCity }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    const results = Object.keys(areaData).filter((city) =>
      city.includes(searchQuery.trim())
    );
    setSearchResults(results);
  }, [searchQuery, areaData]);

  const handleSelectCity = (city: string) => {
    setSearchQuery("");
    onSelectCity(city);
  };

  return (
    <div className="mb-5 pl-10">
      <p>搜尋城市：</p>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mt-3">
        {searchResults.map((city) => (
          <div key={city} className="flex items-center">
            <input
              type="checkbox"
              id={city}
              defaultChecked={false}
              onChange={() => handleSelectCity(city)}
            />
            <label htmlFor={city}>{city}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
