import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { deleteHotel } from "../redux/hotelReducer";
import ConfirmationModal from "../Components/ConfirmationModal";

const HotelListPage: React.FC = () => {
  const hotels = useSelector((state: RootState) => state.hotels.hotels);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (id: number) => {
    setSelectedHotelId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedHotelId !== null) {
      dispatch(deleteHotel(selectedHotelId));
      setModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedHotelId(null);
    setModalOpen(false);
  };

  const handleNavigate = () => {
    navigate("/create-hotel");
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 text-white rounded-md p-4">
        <div className="font-bold text-2xl">Hotel List</div>

        <input
          type="text"
          placeholder="Search by Brand / Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-4 md:mt-0 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div>
          <button
            onClick={handleNavigate}
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
          >
            + Add New Hotel
          </button>
        </div>
      </div>

      <div className="relative max-h-[85vh] overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Country</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Brand</th>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <tr
                  key={hotel.id}
                  className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    {hotel.name}
                  </th>
                  <td className="px-6 py-4">{hotel.city}</td>
                  <td className="px-6 py-4">{hotel.country}</td>
                  <td className="px-6 py-4">{hotel.address}</td>
                  <td className="px-6 py-4">{hotel.brand}</td>
                  <td className="px-6 py-4">{hotel.ranking}</td>
                  <td className="px-6 py-4 flex gap-4">
                    <Link
                      to={`/update/${hotel.id}`}
                      className="font-medium text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(hotel.id)}
                      className="font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  No hotels found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default HotelListPage;
