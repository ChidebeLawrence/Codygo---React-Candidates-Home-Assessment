import React, { useState } from "react";
import { HotelInterface } from "../Components/Lists";
import { groupByRank } from "../Components/utils";

interface RankedHotelProps {
  hotels: HotelInterface[];
}

const RankedHotel: React.FC<RankedHotelProps> = ({ hotels }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rankFilter, setRankFilter] = useState<string>("");

  const filterHotels = (hotelList: HotelInterface[]) => {
    return hotelList.filter((hotel) => {
      const matchesNameOrBrand =
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRank = !rankFilter || hotel.ranking === Number(rankFilter);

      return matchesNameOrBrand && matchesRank;
    });
  };

  const groupedHotels = groupByRank(filterHotels(hotels));

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 text-white rounded-md p-4">
        <div className="font-bold text-2xl">Hotel Ranking</div>

        <input
          type="text"
          placeholder="Search by Brand / Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-4 md:mt-0 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Filter by Rank"
          value={rankFilter}
          onChange={(e) => setRankFilter(e.target.value)}
          className="mt-4 md:mt-0 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      {Object.keys(groupedHotels).length > 0 ? (
        Object.keys(groupedHotels).map((rank) => (
          <div key={rank} className="mb-6">
            <h2 className="text-lg font-medium mb-2">Rank: {rank}</h2>

            <div className="overflow-x-auto">
              <table className="table-auto min-w-full text-left rtl:text-right text-gray-400">
                <thead className="uppercase bg-gray-700 text-gray-400">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">City</th>
                    <th className="px-4 py-2">Country</th>
                    <th className="px-4 py-2">Brand</th>
                    <th className="px-4 py-2">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedHotels[Number(rank)].map((hotel) => (
                    <tr
                      key={hotel.id}
                      className="hover:bg-gray-700 border-b border-b-gray-600 last:border-b-0"
                    >
                      <td className="px-4 py-2">{hotel.name}</td>
                      <td className="px-4 py-2">{hotel.city}</td>
                      <td className="px-4 py-2">{hotel.country}</td>
                      <td className="px-4 py-2">{hotel.brand}</td>
                      <td className="px-4 py-2">{hotel.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 mt-6">
          No hotels match your search criteria.
        </p>
      )}
    </div>
  );
};

export default RankedHotel;
