import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteBrand } from "../redux/brandReducer";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../Components/ConfirmationModal";

const BrandListPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const brands = useSelector((state: RootState) => state.brands.brands);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteClick = (id: number) => {
    setSelectedBrandId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBrandId !== null) {
      dispatch(deleteBrand(selectedBrandId));
      setModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedBrandId(null);
    setModalOpen(false);
  };

  const handleNavigate = () => {
    navigate("/create-brand");
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 text-white rounded-md p-4">
      <div className="font-bold text-2xl">Brands</div>

          <input
            type="text"
            placeholder="Search Brand"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-4 md:mt-0 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          <button
            onClick={handleNavigate}
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
          >
            + Add New Brand
          </button>
      </div>

      <div className="font-bold text-lg py-4">Brand List</div>

      <div className="relative max-h-[85vh] overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              <th className="px-6 py-4">Founded</th>
              <th className="px-6 py-4">Headquarters</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <tr
                  key={brand.brandId}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {brand.name}
                  </th>
                  <td className="px-6 py-4">{brand.founded}</td>
                  <td className="px-6 py-4">{brand.headquarters}</td>
                  <td className="px-6 py-4 flex gap-4">
                    <Link
                      to={`/update-brand/${brand.brandId}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(brand.brandId)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  No brand found
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

export default BrandListPage;
