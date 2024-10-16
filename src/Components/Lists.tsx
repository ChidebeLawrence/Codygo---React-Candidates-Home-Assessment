export const HotelList = [
  {
    id: 1,
    name: "Grand Hotel",
    city: "New York",
    country: "USA",
    address: "123 Main St, New York, NY 10001",
    brand: "Luxury Stay",
    ranking: 5,
  },
  {
    id: 2,
    name: "Ocean View Resort",
    city: "Miami",
    country: "USA",
    address: "456 Ocean Dr, Miami, FL 33139",
    brand: "Coastal Retreats",
    ranking: 5,
  },
  {
    id: 3,
    name: "Mountain Escape Lodge",
    city: "Aspen",
    country: "USA",
    address: "789 Mountain Rd, Aspen, CO 81611",
    brand: "Nature's Wonders",
    ranking: 5,
  },
  {
    id: 4,
    name: "City Lights Hotel",
    city: "London",
    country: "UK",
    address: "101 Queen St, London EC1A 1BB",
    brand: "Urban Life",
    ranking: 5,
  },
  {
    id: 5,
    name: "Desert Sands Inn",
    city: "Dubai",
    country: "UAE",
    address: "202 Palm Blvd, Dubai 00000",
    brand: "Exotic Getaways",
    ranking: 5,
  },
];

export interface HotelInterface {
  id: number;
  name: string;
  city: string;
  country: string;
  address: string;
  brand: string;
  brandId?: number | null;
  ranking: number,
}

export const BrandList = [
  {
    brandId: 1,
    name: "Luxury Stay",
    founded: 1998,
    headquarters: "New York, NY, USA",
  },
  {
    brandId: 2,
    name: "Coastal Retreats",
    founded: 2005,
    headquarters: "Miami, FL, USA",
  },
  {
    brandId: 3,
    name: "Nature's Wonders",
    founded: 2010,
    headquarters: "Aspen, CO, USA",
  },
  {
    brandId: 4,
    name: "Urban Life",
    founded: 2002,
    headquarters: "London, UK",
  },
  {
    brandId: 5,
    name: "Exotic Getaways",
    founded: 2015,
    headquarters: "Dubai, UAE",
  },
];

export interface BrandInterface {
  brandId: number;
  name: string;
  founded: string;
  headquarters: string;
}
