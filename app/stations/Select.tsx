import React, { useState, useEffect } from "react";

interface SelectProps {
  cities: string[];
}

const Select: React.FC<SelectProps> = ({ cities }) => {
  const [filteredCities, setFilteredCities] = useState<string[]>(cities);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    if (selectedCity) {
      // Perform additional actions when a city is selected
      // For example, fetch and render corresponding districts
    }
  }, [selectedCity]);

  return (
    <div>
      <select
        value={selectedCity || ""}
        onChange={handleSelectChange}
        className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="" disabled>
          選擇縣市
        </option>
        {filteredCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

// 包含全台灣縣市的陣列
const taiwanCities = [
  "基隆市",
  "臺北市",
  "新北市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "苗栗縣",
  "臺中市",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義市",
  "嘉義縣",
  "臺南市",
  "高雄市",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
];

export default () => <Select cities={taiwanCities} />;
