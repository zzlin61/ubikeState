// app/stations/Info.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";

interface InfoProps {
  selectedAreas: string[];
}

const Info: React.FC<InfoProps> = ({ selectedAreas }) => {
  const [bikeData, setBikeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(""); // "sbi" or "bemp"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

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

  // Paginate the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBikeData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (field: string) => {
    setSortBy(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table className="w-full  table-auto border-collapse">
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
              {currentItems.map((bike) => (
                <tr
                  key={bike.sno}
                  className="text-center even:bg-gray-100 odd:bg-white"
                >
                  <td className="p-5">台北市</td>
                  <td className="p-5">{bike.sarea}</td>
                  <td className="p-5">{bike.sna}</td>
                  <td className="p-5 text-green-500">{bike.sbi}</td>
                  <td className="p-5 text-green-500">{bike.bemp}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= filteredBikeData.length}
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
