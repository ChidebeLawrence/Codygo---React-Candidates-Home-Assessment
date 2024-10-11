import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { updateBrand } from "../redux/brandReducer";

const EditBrand: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const brands = useSelector((state: RootState) => state.brands.brands);
  const currentBrand = brands.find((brand) => brand.brandId === Number(id));

  const [name, setName] = useState<string>("");
  const [founded, setFounded] = useState<string>("");
  const [headquarters, setHeadquarters] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentBrand) {
      setName(currentBrand.name);
      setFounded(currentBrand.founded);
      setHeadquarters(currentBrand.headquarters);
    }
  }, [currentBrand]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentBrand) {
      dispatch(
        updateBrand({
          ...currentBrand,
          name,
          founded,
          headquarters,
        })
      );
      navigate("/brands");
    }
  };

  const handleCancel = () => {
    navigate("/brands");
  };

  if (!currentBrand) {
    return <p>Brand not found</p>;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="font-bold text-xl text-center">Edit Brand</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="founded"
            value={founded}
            onChange={(e) => setFounded(e.target.value)}
            required
            id="founded"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
            placeholder=" "
          />
          <label
            htmlFor="founded"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Founded
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="headquarters"
            value={headquarters}
            onChange={(e) => setHeadquarters(e.target.value)}
            required
            id="headquarters"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
            placeholder=" "
          />
          <label
            htmlFor="headquarters"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Headquarters
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="text-white block bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:focus:ring-green-900 w-full sm:w-auto"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="text-white block bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:focus:ring-red-900 w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBrand;
