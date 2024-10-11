import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addBrand } from "../redux/brandReducer";
import { useNavigate } from "react-router-dom";

const BrandForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [founded, setFounded] = useState<string>("");
  const [headquarters, setHeadquarters] = useState<string>("");
  const brands = useSelector((state: RootState) => state.brands.brands);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBrandId =
      brands.length > 0 ? brands[brands.length - 1].brandId + 1 : 1;

    dispatch(
      addBrand({
        brandId: newBrandId,
        name,
        founded,
        headquarters,
      })
    );
    navigate("/brands");
  };

  const handleCancel = () => {
    navigate("/brands");
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="font-bold text-lg text-center">Create New Brand</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            id="name"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onChange={(e) => setFounded(e.target.value)}
            required
            name="founded"
            id="founded"
            value={founded}
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
            placeholder=" "
          />
          <label
            htmlFor="founded"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Founded
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="headquarters"
            id="headquarters"
            value={headquarters}
            onChange={(e) => setHeadquarters(e.target.value)}
            required
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
            placeholder=" "
          />
          <label
            htmlFor="headquarters"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Headquarters
          </label>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <button
            type="submit"
            className="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-8 py-2.5 mb-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-900"
          >
            Create
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-8 py-2.5 mb-2 bg-red-600 hover:bg-red-700 focus:ring-purple-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;
