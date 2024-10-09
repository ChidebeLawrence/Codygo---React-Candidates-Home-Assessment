export const groupByBrand = (hotels: Array<{ brand: string }>) => {
    return hotels.reduce((acc: Record<string, Array<{ brand: string }>>, hotel) => {
      if (!acc[hotel.brand]) {
        acc[hotel.brand] = [];
      }
      acc[hotel.brand].push(hotel);
      return acc;
    }, {});
  };
  