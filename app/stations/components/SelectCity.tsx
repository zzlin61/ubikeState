"use client";
interface SelectCityProps {
  cities: string[];
  onSelectCity: (city: string | null) => void;
  searchCity: string;
}

const SelectCity: React.FC<SelectCityProps> = ({
  cities,
  onSelectCity,
  searchCity,
}) => {
  return (
    <div className="mb-5 pl-10 w-full ">
      <select
        value={searchCity}
        onChange={(e) => onSelectCity(e.target.value)}
        className="border bg-slate-100 px-2 py-1.5 rounded-lg font-medium"
      >
        {cities.map((city) => (
          <option key={city} value={city} className="w-full bg-slate-100">
            {city === searchCity ? city : cities}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCity;
