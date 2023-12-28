"use client";

import { useState } from "react";
import { taiwanCities, areaData } from "../data/area";
import CheckboxArea from "./components/CheckboxArea";
import Info from "./components/Info";
import Search from "./components/Search";
import DropdownMenu from "./components/DropdownMenu";
import Image from "next/image";

const StationPage = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchCity, setSearchCity] = useState<string>("");

  const handleSelectCity = (city: string | null) => {
    setSelectedCity(city);
    setSelectedAreas([]);
    setSearchResults([]);
  };

  const handleSelectedAreasChange = (areas: string[]) => {
    setSelectedAreas(areas);
  };

  const handleSearchCity = (searchCity: string) => {
    setSearchCity(searchCity);

    if (typeof searchCity === "string") {
      const results = taiwanCities.filter((city) =>
        city.includes(searchCity.trim())
      );

      setSearchResults(results);
      setSelectedCity(results.length > 0 ? results[0] : null);
      setSelectedAreas([]);
    }
  };
  return (
    <div>
      <p className="py-5 font-semibold text-2xl text-greenery pl-10">
        站點資訊
      </p>
      <div className="md:grid grid-cols-2">
        <div>
          <div className="flex  px-10 flex-wrap gap-2">
            <DropdownMenu
              cities={searchResults.length > 0 ? searchResults : taiwanCities}
              onSelectCity={handleSelectCity}
              searchCity={searchCity}
            />
            <Search
              taiwanCities={taiwanCities}
              areaData={areaData}
              onSearch={handleSearchCity}
            />
          </div>
          <CheckboxArea
            areaData={areaData}
            selectedCity={selectedCity}
            onSelectedAreasChange={handleSelectedAreasChange}
          />
        </div>
        <Image
          src="/images/biking.png"
          alt="Ubike Logo"
          width="500"
          height="500"
          className="hidden md:block"
        />
      </div>

      {selectedAreas.length > 0 && <Info selectedAreas={selectedAreas} />}
    </div>
  );
};

export default StationPage;
