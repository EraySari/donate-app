import { useEffect, useState } from "react";
import FilterElements from "./FilterElements";
import FilterElementsContent from "./FilterElementsContent";
import { useAppDispatch } from "../store";
import { searchProduct } from "../store/ProductStore/Products/thunks";

interface ProductFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ProductFilter = ({ searchTerm, setSearchTerm }: ProductFilterProps) => {
  return (
    <div className="hidden bg-gray-50 2xl:col-span-3 2xl:block p-15">
      <div className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Search product"
          className="py-3 px-4 border border-gray-200 rounded-md shadow-xs w-full"
          value={searchTerm}
          style={{ backgroundColor: "#f1f5f9" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <div className="flex items-center gap-3">
            <h6 className="text-15 grow">Filter</h6>
            <div className="shrink-0">
              <button className="underline transition-all duration-200 ease-linear hover:text-custom-500">
                Clear All
              </button>
            </div>
          </div>

          <FilterElements title="Price">
            <FilterElementsContent labelText="All" inputId="priceAll" />
            <FilterElementsContent labelText="0.00 - 50.00" inputId="price1" />
            <FilterElementsContent
              labelText="50.00 - 100.00"
              inputId="price2"
            />
            <FilterElementsContent labelText="100.00+" inputId="price3" />
          </FilterElements>
          <FilterElements title="Category">
            <FilterElementsContent labelText="All" inputId="priceAll" />
            <FilterElementsContent labelText="Icecek" inputId="icecek" />
            <FilterElementsContent
              labelText="Süt Ürünleri"
              inputId="sütürünleri"
            />
            <FilterElementsContent labelText="Et - Tavuk" inputId="et" />
          </FilterElements>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
