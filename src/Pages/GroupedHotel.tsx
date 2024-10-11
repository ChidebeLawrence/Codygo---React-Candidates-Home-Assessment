import React, { useMemo, useState } from "react";
import { groupByBrand } from "../Components/utils";
import { HotelInterface } from "../Components/Lists";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const GroupedHotel: React.FC = () => {
  const hotels: HotelInterface[] = useSelector(
    (state: RootState) => state.hotels.hotels
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredHotels = useMemo(() => {
    if (!searchQuery.trim()) return hotels;

    return hotels.filter(
      (hotel) =>
        hotel.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [hotels, searchQuery]);

  const groupedHotels = useMemo(
    () => groupByBrand(filteredHotels),
    [filteredHotels]
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 text-white rounded-md p-4">
        <div className="font-bold text-2xl">Hotel Grouped Brand</div>

        <input
          type="text"
          placeholder="Search by Brand / Hotel"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-4 md:mt-0 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {Object.keys(groupedHotels).length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        Object.keys(groupedHotels).map((brand) => (
          <div key={brand} className="mb-4">
            <h3 className="font-bold">{brand}</h3>
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full text-left text-gray-400">
                <thead className="uppercase bg-gray-700 text-gray-400">
                  <tr>
                    <th className="px-4 py-2">Hotel Name</th>
                    <th className="px-4 py-2">City</th>
                    <th className="px-4 py-2">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedHotels[brand].map((hotel) => (
                    <tr
                      key={hotel.id}
                      className="hover:bg-gray-700 border-b border-b-gray-600 last:border-b-0"
                    >
                      <td className="px-4 py-2">{hotel.name}</td>
                      <td className="px-4 py-2">{hotel.city}</td>
                      <td className="px-4 py-2">{hotel.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GroupedHotel;
