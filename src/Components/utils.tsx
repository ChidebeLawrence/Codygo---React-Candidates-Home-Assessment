import { HotelInterface } from "../Components/Lists";

export const groupByBrand = (hotels: HotelInterface[]) => {
  return hotels.reduce((acc: Record<string, HotelInterface[]>, hotel) => {
    if (!acc[hotel.brand]) {
      acc[hotel.brand] = [];
    }
    acc[hotel.brand].push(hotel);
    return acc;
  }, {});
};

export const groupByRank = (hotels: HotelInterface[]) => {
  return hotels.reduce<Record<number, HotelInterface[]>>((acc, hotel) => {
    if (!acc[hotel.ranking]) {
      acc[hotel.ranking] = [];
    }
    acc[hotel.ranking].push(hotel);
    return acc;
  }, {});
};
