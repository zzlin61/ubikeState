import React, { useEffect, useState } from "react";

type AreaData = { [key: string]: string[] };

interface CheckboxAreaProps {
  selectedCity: string | null;
  onSelectedAreasChange: (areas: string[]) => void;
  areaData: AreaData;
  selectedSearchCity?: string | null;
}

const CheckboxArea: React.FC<CheckboxAreaProps> = ({
  selectedCity,
  onSelectedAreasChange,
  areaData,
  selectedSearchCity,
}) => {
  const [areas, setAreas] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    const currentCity = selectedSearchCity || selectedCity;

    if (currentCity) {
      setAreas(areaData[currentCity] || []);
    } else {
      setAreas([]);
    }
  }, [selectedCity, selectedSearchCity, areaData]);

  const handleCheckboxChange = (area: string) => {
    const updatedAreas = areas.includes(area)
      ? areas.filter((selectedArea) => selectedArea !== area)
      : [...areas, area];

    setAreas(updatedAreas);
    onSelectedAreasChange(updatedAreas);
  };

  const handleSelectAllChange = () => {
    const allAreas = areaData[selectedCity || selectedSearchCity || ""] || [];
    const updatedAreas = selectAll ? [] : [...allAreas];

    setAreas(updatedAreas);
    onSelectedAreasChange(updatedAreas);
    setSelectAll(!selectAll);
  };

  return (
    <div className="mb-10">
      <div className="mb-5 pl-10">
        <input
          type="checkbox"
          id="selectAll"
          checked={selectAll}
          onChange={handleSelectAllChange}
          className="accent-greenery "
        />
        <label htmlFor="selectAll">全部勾選</label>
      </div>

      {(selectedCity || selectedSearchCity) && (
        <div className="flex  flex-wrap gap-7 mt-5 pl-10 md:w-3/4">
          {(areaData[selectedCity || selectedSearchCity] || []).map((area) => (
            <div key={area} className="flex items-center ">
              <input
                type="checkbox"
                id={area}
                value={area}
                checked={areas.includes(area)}
                onChange={() => handleCheckboxChange(area)}
                className="accent-greenery"
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
