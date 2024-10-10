export const groupByBrand = (hotels: Array<{ id: number,name: string, city: string, country: string }>) => {
    return hotels.reduce((acc: Record<string, Array<{ name: string, city: string, country: string, id: number }>>, hotel) => {
      if (!acc[hotel.name]) {
        acc[hotel.name, hotel.city, hotel.country] = [];
      }
      acc[hotel.name, hotel.city, hotel.country].push(hotel);
      return acc;
    }, {});
  };
  