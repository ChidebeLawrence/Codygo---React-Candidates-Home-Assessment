export const groupByBrand = (hotels: Array<{ id: number, brand: string, city: string, country: string }>) => {
    return hotels.reduce((acc: Record<string, Array<{ brand: string, city: string, country: string, id: number }>>, hotel) => {
      if (!acc[hotel.brand]) {
        acc[hotel.brand, hotel.city, hotel.country] = [];
      }
      acc[hotel.brand, hotel.city, hotel.country].push(hotel);
      return acc;
    }, {});
  };
  