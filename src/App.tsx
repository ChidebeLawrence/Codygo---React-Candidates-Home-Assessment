import React from "react";
import HotelListPage from "./Pages/HotelListPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HotelForm from "./Components/CreateHotel";
import EditHotel from "./Components/EditHotel";
import BrandListPage from "./Pages/BrandListPage";
import BrandForm from "./Components/CreateBrand";
import Home from "./Pages/Home";
import EditBrand from "./Components/EditBrand";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HotelListPage />} />
          <Route path="/hotels" element={<HotelListPage />} />
          <Route path="/create-hotel" element={<HotelForm />} />
          <Route path="/update/:id" element={<EditHotel />} />
          <Route path="/brands" element={<BrandListPage />} />
          <Route path="/create-brand" element={<BrandForm />} />
          <Route path="/update-brand/:id" element={<EditBrand />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
