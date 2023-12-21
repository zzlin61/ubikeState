"use client";

import { useEffect, useState } from "react";
import CheckBox from "./CheckBox";
import Info from "./Info";
import Select from "./Select";
import Search from "./Search";
import axios from "axios";

const StationPage = () => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const handleSelectedAreasChange = (areas: string[]) => {
    setSelectedAreas(areas);
  };

  return (
    <div>
      <p className="p-10 font-semibold text-2xl text-green-600">站點資訊</p>
      <Select
      // cities={cities}
      // selectedCity={selectedCity}
      // setSelectedCity={setSelectedCity}
      />
      <Search />
      <CheckBox onSelectedAreasChange={handleSelectedAreasChange} />
      {selectedAreas.length > 0 && <Info selectedAreas={selectedAreas} />}
    </div>
  );
};

export default StationPage;
