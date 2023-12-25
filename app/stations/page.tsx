"use client";

import { useEffect, useState } from "react";
import SelectCity from "./components/SelectCity";
import { taiwanCities, areaData } from "../data/area";
import CheckboxArea from "./components/CheckboxArea";
import Search from "./components/Search";

const StationPage = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSelectCity = (city: string | null) => {
    setSelectedCity(city);
    setSelectedAreas([]);
    setSearchResults([]); // Reset search results when a city is selected
  };

  const handleSelectedAreasChange = (areas: string[]) => {
    setSelectedAreas(areas);
  };

  const handleSearch = (query: string) => {
    // Filter city names based on the search query
    const results = taiwanCities.filter((city) => city.includes(query.trim()));
    setSearchResults(results);
  };

  return (
    <div>
      <p className="py-5 font-semibold text-2xl text-green-600 pl-10">
        站點資訊
      </p>

      <SelectCity
        cities={searchResults.length > 0 ? searchResults : taiwanCities}
        onSelectCity={handleSelectCity}
      />
      <Search areaData={areaData} onSelectCity={handleSelectCity} />
      <CheckboxArea
        areaData={areaData}
        selectedCity={selectedCity}
        onSelectedAreasChange={handleSelectedAreasChange}
      />
      {/* {selectedAreas.length > 0 && <Info selectedAreas={selectedAreas} />} */}
    </div>
  );
};

export default StationPage;
