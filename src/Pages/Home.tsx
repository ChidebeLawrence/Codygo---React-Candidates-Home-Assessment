import React, { useEffect, useState, useMemo } from "react";
import { Link, Outlet } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { groupByBrand } from "../Components/utils";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const GEOCODE_API_KEY = "341cabb775fa4ef388043ed3ab701098";

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
}

const Home: React.FC = () => {
  const hotels = useSelector((state: RootState) => state.hotels.hotels);
  const groupedHotels = useMemo(() => groupByBrand(hotels), [hotels]);

  const [geocodedHotels, setGeocodedHotels] = useState<GeocodedHotel[]>([]);
  const [only, setOnly] = useState(false);

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
      return { ...hotel, latitude: lat, longitude: lng };
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

  const defaultCenter: [number, number] = [51.505, -0.09]; // Type the center as [number, number]

  useEffect(() => {
    setOnly(
      location.pathname.includes("/update/") ||
        location.pathname.includes("/create-hotel") ||
        location.pathname.includes("/create-brand")
    );
  }, [location.pathname]);

  return (
    <div className="bg-[#111827] text-white w-full h-auto px-10 py-4 shadow-xl">
      <div className="bg-[#111827] text-white w-full sm:w-1/2 mx-auto h-auto px-6 py-4 flex flex-col justify-center sm:flex-row gap-4">
        <Link
          to="/hotels"
          className="font-bold text-lg text-center w-full sm:w-auto"
        >
          Hotels
        </Link>
        <Link
          to="/brands"
          className="font-bold text-lg text-center w-full sm:w-auto"
        >
          Brands
        </Link>
      </div>

      <Outlet />

      <div>
        <h2 className="font-bold text-lg mt-6">Grouped Hotels by Brand</h2>
        {Object.keys(groupedHotels).length === 0 ? (
          <p>No hotels available.</p>
        ) : (
          Object.keys(groupedHotels).map((brand) => (
            <div key={brand} className="mb-4">
              <h3 className="font-bold">{brand}</h3>
              <ul>
                {groupedHotels[brand].map((hotel) => (
                  <li key={hotel.id} className="text-gray-700">
                    {hotel.name} - {hotel.city}, {hotel.country}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      <div className="my-6 mb-10">
        <h2 className="font-bold text-lg mb-4">Hotel Locations on Map</h2>
        <MapContainer
          center={defaultCenter} // Correctly typed [number, number]
          zoom={2}
          scrollWheelZoom={false}
          className="h-96 w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {geocodedHotels.map((hotel) => (
            <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
              <Popup>
                <strong>{hotel.name}</strong>
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
