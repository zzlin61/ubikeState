import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useState, useEffect } from "react";

interface DropdownMenuProps {
  cities: string[];
  onSelectCity: (city: string | null) => void;
  searchCity: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  cities,
  onSelectCity,
  searchCity,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>(cities);

  useEffect(() => {
    if (searchCity !== "") {
      const results = cities.filter((city) => city.includes(searchCity));
      setFilteredCities(results);
    } else {
      setFilteredCities(cities);
    }
  }, [searchCity, cities]);

  const handleCityClick = (city: string) => {
    onSelectCity(city === searchCity ? null : city);
    setIsOpen(false);
  };

  return (
    <div className=" relative flex flex-col rounded-lg  w-full md:w-1/3">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-slate-100 w-full px-1 flex items-center justify-between font-semibold text-gray-400 text-lg  rounded-lg tracking-wider border-4 border-transparent"
      >
        縣市清單
        <AiOutlineCaretDown className="h-8" />
      </button>
      {isOpen && (
        <div className="bg-slate-100 absolute top-[3rem] flex flex-col items-start rounded-lg  w-full">
          {filteredCities.map((city, i) => (
            <div
              onClick={() => handleCityClick(city)}
              className={`flex w-full justify-between p-4  cursor-pointer rounded-lg border-l-transparent font-medium ${
                city === searchCity ? "bg-gray-200" : "hover:font-extrabold"
              }`}
              key={i}
            >
              <h3>{city}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
