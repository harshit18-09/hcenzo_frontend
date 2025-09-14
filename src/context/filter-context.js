import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducer";

const initalValue = {
  isFilterModalOpen: false,
  priceRange: [300, 20000],
  noOfBathrooms: "Any",
  noOfBedrooms: "Any",
  noOfBeds: "Any",
  propertyType: "Any",
  hcenzoRating: 1,
  isCancelable: true,
};

const FilterContext = createContext(initalValue);

const FilterProvider = ({ children }) => {
  const [
    {
      isFilterModalOpen,
      priceRange,
      noOfBathrooms,
      noOfBedrooms,
      noOfBeds,
      propertyType,
      hcenzoRating,
      isCancelable,
    },
    filterDispatch,
  ] = useReducer(filterReducer, initalValue);

  return (
    <FilterContext.Provider
      value={{
        isFilterModalOpen,
        priceRange,
        noOfBathrooms,
        noOfBedrooms,
        noOfBeds,
        propertyType,
        hcenzoRating,
        isCancelable,
        filterDispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { useFilter, FilterProvider };