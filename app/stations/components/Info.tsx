// app/stations/Info.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";

interface InfoProps {
  selectedAreas: string[];
}

const Info: React.FC<InfoProps> = ({ selectedAreas }) => {
  const [bikeData, setBikeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const url =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setBikeData(res.data);
      } catch (error) {
        console.log("Error fetching bike data.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort the data based on selected areas and sorting order
  const filteredBikeData = bikeData
    .filter((bike) => selectedAreas.includes(bike.sarea))
    .sort((a, b) => {
      if (sortBy && sortOrder === "asc") {
        return a[sortBy] - b[sortBy];
      } else if (sortBy && sortOrder === "desc") {
        return b[sortBy] - a[sortBy];
      } else {
        return 0;
      }
    });

  const handleSort = (field: string) => {
    setSortBy(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="px-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table className="w-full table-auto border-separate border-spacing-0 rounded-[2rem] border mb-10 ">
            <thead className="bg-green-500 text-white">
              <tr>
                <th
                  className="p-5 rounded-tl-[2rem] cursor-pointer"
                  onClick={() => handleSort("sarea")}
                >
                  縣市
                </th>
                <th
                  className="p-5 cursor-pointer"
                  onClick={() => handleSort("sarea")}
                >
                  區域
                </th>
                <th className="p-5">站點名稱</th>
                <th
                  className="p-5 cursor-pointer"
                  onClick={() => handleSort("sbi")}
                >
                  可借車輛
                </th>
                <th
                  className="p-5 rounded-tr-[2rem] cursor-pointer"
                  onClick={() => handleSort("bemp")}
                >
                  可還空位
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBikeData.map((bike, index) => (
                <tr
                  key={bike.sno}
                  className="text-center 
                     even:bg-gray-100 odd:bg-white"
                >
                  <td
                    className={`p-5  ${
                      index === filteredBikeData.length - 1
                        ? "rounded-bl-[2rem]"
                        : ""
                    }`}
                  >
                    台北市
                  </td>
                  <td className="p-5">{bike.sarea}</td>
                  <td className="p-5">{bike.sna}</td>
                  <td className="p-5 text-green-500">{bike.sbi}</td>
                  <td
                    className={`p-5 text-green-500 ${
                      index === filteredBikeData.length - 1
                        ? "rounded-br-[2rem]"
                        : ""
                    }`}
                  >
                    {bike.bemp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Info;
