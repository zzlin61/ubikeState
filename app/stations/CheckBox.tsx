// import React from "react";

// interface CheckBoxProps {
//   areas: string[];
//   selectedAreas: string[];
//   setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
// }

// const CheckBox: React.FC<CheckBoxProps> = ({
//   areas,
//   selectedAreas,
//   setSelectedAreas,
// }) => {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const area = event.target.value;
//     if (selectedAreas.includes(area)) {
//       setSelectedAreas(
//         selectedAreas.filter((selectedArea) => selectedArea !== area)
//       );
//     } else {
//       setSelectedAreas([...selectedAreas, area]);
//     }
//   };

//   return (
//     <div>
//       <p>選擇區域：</p>
//       {areas.map((area) => (
//         <div key={area} className="flex items-center">
//           <input
//             type="checkbox"
//             id={area}
//             value={area}
//             checked={selectedAreas.includes(area)}
//             onChange={handleChange}
//           />
//           <label htmlFor={area}>{area}</label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CheckBox;

import React, { useState, useEffect } from "react";
import axios from "axios";

interface CheckboxProps {
  onSelectedAreasChange: (selectedAreas: string[]) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ onSelectedAreasChange }) => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [allAreas, setAllAreas] = useState<string[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(true);

  const url =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

  useEffect(() => {
    // Fetch unique areas from API
    const fetchUniqueAreas = async () => {
      try {
        const response = await axios.get(url);
        const bikeData = response.data;
        const allAreas = Array.from(
          new Set(bikeData.map((bike) => bike.sarea))
        );
        setAllAreas(allAreas);
        setFilteredAreas(allAreas);
      } catch (error) {
        console.error("Error fetching bike data:", error);
      }
    };

    fetchUniqueAreas();
  }, []);

  useEffect(() => {
    // Notify parent component when selected areas change
    onSelectedAreasChange(selectedAreas);
  }, [selectedAreas, onSelectedAreasChange]);

  const handleCheckboxChange = (area: string) => {
    const updatedSelectedAreas = [...selectedAreas];

    if (selectedAreas.includes(area)) {
      // If already included, remove
      const index = updatedSelectedAreas.indexOf(area);
      updatedSelectedAreas.splice(index, 1);
    } else {
      // Otherwise, add
      updatedSelectedAreas.push(area);
    }

    setSelectedAreas(updatedSelectedAreas);
    setSelectAll(updatedSelectedAreas.length === filteredAreas.length);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedAreas(selectAll ? [] : filteredAreas);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        Select All
      </label>

      {filteredAreas.map((area) => (
        <div key={area} className="flex items-center">
          <input
            type="checkbox"
            id={area}
            value={area}
            checked={selectedAreas.includes(area)}
            onChange={() => handleCheckboxChange(area)}
          />
          <label htmlFor={area}>{area}</label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
