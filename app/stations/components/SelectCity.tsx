import React, { useState } from "react";

interface SelectCityProps {
  cities: string[];
  onSelectCity: (selectedCity: string | null) => void;
}

const SelectCity: React.FC<SelectCityProps> = ({ cities, onSelectCity }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    onSelectCity(city);
  };

  return (
    <div className="pl-10">
      <label>
        <select
          value={selectedCity || ""}
          onChange={handleCityChange}
          className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            選擇縣市
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectCity;
