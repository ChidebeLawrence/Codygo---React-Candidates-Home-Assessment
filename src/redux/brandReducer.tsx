import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BrandInterface, BrandList } from "../Components/Lists";

interface BrandsState {
  brands: BrandInterface[];
}

const initialState: BrandsState = {
brands: JSON.parse(localStorage.getItem('brands') || 'null') || BrandList,
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addBrand: (state, action: PayloadAction<BrandInterface>) => {
      state.brands.push(action.payload);
      localStorage.setItem('brands', JSON.stringify(state.brands));
    },
    deleteBrand: (state, action: PayloadAction<number>) => {
      state.brands = state.brands.filter(
        (brand) => brand.brandId !== action.payload
      );
      localStorage.setItem('brands', JSON.stringify(state.brands));
    },
    updateBrand: (state, action: PayloadAction<BrandInterface>) => {
      const index = state.brands.findIndex((b) => b.brandId === action.payload.brandId);
      if (index !== -1) {
        state.brands[index] = action.payload;
        localStorage.setItem('brands', JSON.stringify(state.brands));
      }
    },
  },
});

export const { addBrand, deleteBrand, updateBrand } = brandsSlice.actions;
export default brandsSlice.reducer;
