import React, { useEffect, useState } from "react";

type AreaData = { [key: string]: string[] };

interface CheckboxAreaProps {
  selectedCity: string | null;
  onSelectedAreasChange: (areas: string[]) => void;
  areaData: AreaData;
}

const CheckboxArea: React.FC<CheckboxAreaProps> = ({
  selectedCity,
  onSelectedAreasChange,
  areaData,
}) => {
  const [areas, setAreas] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(true); // Set to true initially

  useEffect(() => {
    if (selectedCity) {
      setAreas(areaData[selectedCity] || []);
    } else {
      setAreas([]);
    }
  }, [selectedCity, areaData]);

  const handleCheckboxChange = (area: string) => {
    const updatedAreas = areas.includes(area)
      ? areas.filter((selectedArea) => selectedArea !== area)
      : [...areas, area];

    setAreas(updatedAreas);
    onSelectedAreasChange(updatedAreas);
  };

  const handleSelectAllChange = () => {
    const allAreas = areaData[selectedCity || ""] || [];
    const updatedAreas = selectAll ? [] : [...allAreas];

    setAreas(updatedAreas);
    onSelectedAreasChange(updatedAreas);
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <div className="mb-5 pl-10">
        <input
          type="checkbox"
          id="selectAll"
          checked={selectAll}
          onChange={handleSelectAllChange}
        />
        <label htmlFor="selectAll">全部勾選</label>
      </div>

      {selectedCity && (
        <div className="flex w-1/3 flex-wrap gap-7 mt-5 pl-10">
          {areaData[selectedCity].map((area) => (
            <div key={area} className="flex items-center ">
              <input
                type="checkbox"
                id={area}
                value={area}
                checked={areas.includes(area)}
                onChange={() => handleCheckboxChange(area)}
              />
              <label htmlFor={area}>{area}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxArea;
