import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { HotelInterface } from "../Components/Lists";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "",
  iconUrl: "",
  shadowUrl: "",
});

const GEOCODE_API_KEY = "9f93f0160261446cb4b4d107d255fe61";

interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;
  address: string;
  brand: string;
}

interface GeocodedHotel extends Hotel {
  latitude: number;
  longitude: number;
  countryCode: string;
}

const Home: React.FC = () => {
  const hotels: HotelInterface[] = useSelector(
    (state: RootState) => state.hotels.hotels
  );

  const [geocodedHotels, setGeocodedHotels] = useState<GeocodedHotel[]>([]);

  const geocodeAddress = async (
    hotel: Hotel
  ): Promise<GeocodedHotel | null> => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        hotel.address
      )}&key=${GEOCODE_API_KEY}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      const countryCode = data.results[0].components.country_code.toUpperCase();
      return { ...hotel, latitude: lat, longitude: lng, countryCode };
    }
    return null;
  };

  useEffect(() => {
    const geocodeHotels = async () => {
      const geocoded = await Promise.all(
        hotels.map((hotel) => geocodeAddress(hotel))
      );
      setGeocodedHotels(
        geocoded.filter((hotel) => hotel !== null) as GeocodedHotel[]
      );
    };

    geocodeHotels();
  }, [hotels]);

  const defaultCenter: [number, number] = [51.505, -0.09];

  const createFlagIcon = (countryCode: string) => {
    return new L.Icon({
      iconUrl: `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`,
      iconSize: [24, 18],
      iconAnchor: [12, 18],
      popupAnchor: [0, -18],
    });
  };

  return (
    <div className="bg-[#111827] text-white w-full h-auto px-10 py-4 shadow-xl">
      <div className="bg-[#111827] text-white w-full sm:w-1/2 mx-auto h-auto px-6 py-4 flex flex-col justify-center sm:flex-row gap-4">
        <NavLink
          to="/hotels"
          className={({ isActive }) =>
            `font-bold text-lg text-center w-full sm:w-auto ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          Hotels
        </NavLink>
        <NavLink
          to="/brands"
          className={({ isActive }) =>
            `font-bold text-lg text-center w-full sm:w-auto ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          Brands
        </NavLink>
        <NavLink
          to="/rank"
          className={({ isActive }) =>
            `font-bold text-lg text-center w-full sm:w-auto ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          Rank
        </NavLink>
        <NavLink
          to="/group"
          className={({ isActive }) =>
            `font-bold text-lg text-center w-full sm:w-auto ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          Group
        </NavLink>
      </div>

      <Outlet />

      <div className="my-6 mb-10">
        <h2 className="font-bold text-lg mb-4">Hotel Locations on Map</h2>
        <MapContainer
          center={defaultCenter}
          zoom={2}
          scrollWheelZoom={false}
          className="h-96 w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {geocodedHotels.map((hotel) => (
            <Marker
              key={hotel.id}
              position={[hotel.latitude, hotel.longitude]}
              icon={createFlagIcon(hotel.countryCode)}
            >
              <Popup>
                <strong>{hotel.name}</strong>
                <br />
                <strong>{hotel.address}</strong>
                <br />
                {hotel.city}, {hotel.country}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
