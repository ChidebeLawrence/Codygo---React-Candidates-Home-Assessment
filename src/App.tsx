import React from "react";
import HotelListPage from "./Pages/HotelListPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HotelForm from "./Components/CreateHotel";
import EditHotel from "./Components/EditHotel";
import BrandListPage from "./Pages/BrandListPage";
import BrandForm from "./Components/CreateBrand";
import Home from "./Pages/Home";
import EditBrand from "./Components/EditBrand";
import RankedHotel from "./Pages/RankedHotel";
import { HotelInterface } from "./Components/Lists";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import GroupedHotel from "./Pages/GroupedHotel";

const App: React.FC = () => {
  const hotels: HotelInterface[] = useSelector(
    (state: RootState) => state.hotels.hotels
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="animate-fadeInZoomOut transition-all duration-500">
              <Home />
            </div>
          }
        >
          <Route
            index
            element={
              <div className="animate-fadeInZoomIn transition-all duration-500">
                <HotelListPage />
              </div>
            }
          />
          <Route
            path="/hotels"
            element={
              <div className="animate-slideInLeft transition-all duration-500">
                <HotelListPage />
              </div>
            }
          />
          <Route
            path="/brands"
            element={
              <div className="animate-slideInRight transition-all duration-500">
                <BrandListPage />
              </div>
            }
          />
          <Route
            path="/rank"
            element={
              <div className="animate-slideInDown transition-all duration-500">
                <RankedHotel hotels={hotels} />
              </div>
            }
          />
          <Route
            path="/group"
            element={
              <div className="animate-slideInUp transition-all duration-500">
                <GroupedHotel />
              </div>
            }
          />
          <Route
            path="/create-hotel"
            element={
              <div className="animate-fadeInZoomIn transition-all duration-500">
                <HotelForm />
              </div>
            }
          />
          <Route
            path="/update/:id"
            element={
              <div className="animate-fadeInZoomIn transition-all duration-500">
                <EditHotel />
              </div>
            }
          />
          <Route
            path="/create-brand"
            element={
              <div className="animate-fadeInZoomIn transition-all duration-500">
                <BrandForm />
              </div>
            }
          />
          <Route
            path="/update-brand/:id"
            element={
              <div className="animate-fadeInZoomIn transition-all duration-500">
                <EditBrand />
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
