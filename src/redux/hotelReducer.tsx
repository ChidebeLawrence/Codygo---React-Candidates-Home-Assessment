import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HotelList } from "../Components/Lists";

interface Hotel {
  id: number;
  brandId?: number;
  name: string;
  city: string;
  country: string;
  address: string;
  brand: string;
}

interface HotelsState {
  hotels: Hotel[];
}

const initialState: HotelsState = {
  hotels: JSON.parse(localStorage.getItem("hotels") || "null") || HotelList,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addHotel: (state, action: PayloadAction<Hotel>) => {
      state.hotels.push(action.payload);
      localStorage.setItem("hotels", JSON.stringify(state.hotels));
    },
    deleteHotel: (state, action: PayloadAction<number>) => {
      state.hotels = state.hotels.filter(
        (hotel) => hotel.id !== action.payload
      );
      localStorage.setItem("hotels", JSON.stringify(state.hotels));
    },
    updateHotel: (state, action: PayloadAction<Hotel>) => {
      const index = state.hotels.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state.hotels[index] = action.payload;
        localStorage.setItem("hotels", JSON.stringify(state.hotels));
      }
    },
  },
});

export const { addHotel, deleteHotel, updateHotel } = hotelsSlice.actions;
export default hotelsSlice.reducer;
